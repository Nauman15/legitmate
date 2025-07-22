
import { 
  Home, 
  FileText, 
  AlertTriangle, 
  BookOpen, 
  Settings, 
  PieChart,
  FileSpreadsheet,
  Bell,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mainNavigationItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Contract Review', url: '/contract-review', icon: FileText },
  { title: 'Risk Analytics', url: '/risk-analytics', icon: PieChart },
  { title: 'Policy Compliance', url: '/policy-compliance', icon: AlertTriangle },
];

const complianceItems = [
  { title: 'Regulatory Alerts', url: '/regulatory-alerts', icon: Bell },
  { title: 'Automated Filings', url: '/automated-filings', icon: FileSpreadsheet },
];

const resourceItems = [
  { title: 'Knowledge Base', url: '/knowledge-base', icon: BookOpen },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const sidebar = useSidebar();
  const collapsed = sidebar?.state === 'collapsed';
  const { user, signOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? 'sidebar-nav-link active bg-primary text-primary-foreground font-semibold shadow-sm border-r-2 border-primary-dark' 
      : 'sidebar-nav-link hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium';

  const userInitial = user?.email?.[0]?.toUpperCase() || 'U';
  const userName = user?.email?.split('@')[0] || 'User';

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar shadow-professional">
      <SidebarHeader className="border-b border-sidebar-border p-4 bg-gradient-subtle">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-card">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-serif font-bold sidebar-text-force-black">
                LegitMate
              </h2>
              <p className="text-xs sidebar-text-force-black-muted font-medium">Compliance Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-text-force-black-muted font-semibold px-2 mb-2 text-xs uppercase tracking-wide">
            {!collapsed && 'Main Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">{item.title}</span>
                          <ChevronRight className="h-3 w-3 opacity-50" />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Compliance Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="sidebar-text-force-black-muted font-semibold px-2 mb-2 text-xs uppercase tracking-wide">
            {!collapsed && 'Compliance'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {complianceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">{item.title}</span>
                          {item.title === 'Regulatory Alerts' && (
                            <Badge variant="destructive" className="ml-auto h-5 text-xs font-semibold">
                              3
                            </Badge>
                          )}
                          <ChevronRight className="h-3 w-3 opacity-50" />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Resources Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="sidebar-text-force-black-muted font-semibold px-2 mb-2 text-xs uppercase tracking-wide">
            {!collapsed && 'Resources'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">{item.title}</span>
                          <ChevronRight className="h-3 w-3 opacity-50" />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 bg-gradient-subtle">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-8 h-8 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold sidebar-text-force-black truncate">
                  {userName}
                </p>
                <p className="text-xs sidebar-text-force-black-muted truncate font-medium">
                  {user?.email}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="sidebar-text-force-black hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2 font-medium"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
