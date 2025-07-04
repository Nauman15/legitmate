import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { MessageCircle, Send, Bug, Lightbulb, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'general'>('general');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    // In a real app, this would send to your backend
    console.log('Feedback submitted:', { feedbackType, rating, feedback, email });
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We'll review it soon.",
    });
    
    setIsOpen(false);
    setFeedback('');
    setEmail('');
    setRating(0);
  };

  const feedbackTypes = [
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'destructive' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'secondary' },
    { id: 'general', label: 'General Feedback', icon: MessageCircle, color: 'outline' }
  ];

  return (
    <>
      {/* Floating Feedback Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-elegant hover:shadow-glow z-50"
            variant="professional"
            size="icon"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span>Share Your Feedback</span>
            </DialogTitle>
            <DialogDescription>
              Help us improve LegitMate by sharing your thoughts, reporting bugs, or suggesting features.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Feedback Type Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Feedback Type</Label>
              <div className="grid grid-cols-1 gap-2">
                {feedbackTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setFeedbackType(type.id as any)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                        feedbackType === type.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Overall Rating</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-colors"
                  >
                    <Star 
                      className={`h-6 w-6 ${
                        star <= rating 
                          ? 'text-accent fill-current' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <Label htmlFor="feedback" className="text-sm font-medium mb-2 block">
                Your Feedback
              </Label>
              <Textarea
                id="feedback"
                placeholder="Tell us about your experience, report a bug, or suggest improvements..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave your email if you'd like us to follow up with you.
              </p>
            </div>

            <Button 
              onClick={handleSubmit} 
              className="w-full" 
              variant="professional"
              disabled={!feedback.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};