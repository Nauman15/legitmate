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
      ? 'bg-sidebar-accent text-sidebar-primary-foreground font-medium border-r-2 border-sidebar-primary' 
      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground';

  const userInitial = user?.email?.[0]?.toUpperCase() || 'U';
  const userName = user?.email?.split('@')[0] || 'User';

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-serif font-semibold text-sidebar-foreground">
                LegitMate
              </h2>
              <p className="text-xs text-sidebar-foreground/70">Compliance Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium px-2 mb-2">
            {!collapsed && 'Main'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
                          <span className="flex-1">{item.title}</span>
                          {item.title === 'Regulatory Alerts' && (
                            <Badge variant="destructive" className="ml-auto h-5 text-xs">
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

        {/* Compliance Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium px-2 mb-2">
            {!collapsed && 'Compliance'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
                          <span className="flex-1">{item.title}</span>
                          {item.title === 'Regulatory Alerts' && (
                            <Badge variant="destructive" className="ml-auto h-5 text-xs">
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
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium px-2 mb-2">
            {!collapsed && 'Resources'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
                          <span className="flex-1">{item.title}</span>
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

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-8 h-8 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {userName}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="text-sidebar-foreground hover:bg-sidebar-accent p-2"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}