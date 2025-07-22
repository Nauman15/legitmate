import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ComplianceTask {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  task_type: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
  due_date?: string;
  assigned_to?: string;
  related_filing_id?: string;
  related_contract_id?: string;
  completion_notes?: string;
  attachments?: any[];
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

interface CreateTaskInput {
  title: string;
  description?: string;
  task_type: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  assigned_to?: string;
  related_filing_id?: string;
  related_contract_id?: string;
}

export const useComplianceTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<ComplianceTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('compliance_tasks')
        .select('*')
        .or(`user_id.eq.${user.id},assigned_to.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setTasks(data as ComplianceTask[] || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching compliance tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskInput) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error: createError } = await supabase
        .from('compliance_tasks')
        .insert([{
          ...taskData,
          user_id: user.id
        }])
        .select()
        .single();

      if (createError) throw createError;

      setTasks(prev => [data as ComplianceTask, ...prev]);
      return data;
    } catch (err: any) {
      console.error('Error creating task:', err);
      throw err;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<ComplianceTask>) => {
    try {
      const { data, error: updateError } = await supabase
        .from('compliance_tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();

      if (updateError) throw updateError;

      setTasks(prev => 
        prev.map(task => task.id === taskId ? data as ComplianceTask : task)
      );
      return data;
    } catch (err: any) {
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const completeTask = async (taskId: string, completionNotes?: string) => {
    try {
      await updateTask(taskId, {
        status: 'completed',
        completed_at: new Date().toISOString(),
        completion_notes: completionNotes
      });
    } catch (err: any) {
      console.error('Error completing task:', err);
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('compliance_tasks')
        .delete()
        .eq('id', taskId);

      if (deleteError) throw deleteError;

      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err: any) {
      console.error('Error deleting task:', err);
      throw err;
    }
  };

  const getTasksByStatus = (status: ComplianceTask['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByPriority = (priority: ComplianceTask['priority']) => {
    return tasks.filter(task => task.priority === priority);
  };

  const getOverdueTasks = () => {
    const today = new Date();
    return tasks.filter(task => 
      task.status !== 'completed' && 
      task.status !== 'cancelled' &&
      task.due_date && 
      new Date(task.due_date) < today
    );
  };

  const getUpcomingTasks = (days: number = 7) => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return tasks.filter(task => 
      task.status !== 'completed' && 
      task.status !== 'cancelled' &&
      task.due_date && 
      new Date(task.due_date) >= today &&
      new Date(task.due_date) <= futureDate
    );
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
    getTasksByStatus,
    getTasksByPriority,
    getOverdueTasks,
    getUpcomingTasks
  };
};