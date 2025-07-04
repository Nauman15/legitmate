import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, Bell, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Define public routes that should show non-authenticated UI
  const publicRoutes = ['/', '/login', '/onboarding'];
  const isAuthenticated = !publicRoutes.includes(location.pathname);
  const user = { name: 'User', initial: 'U' }; // Replace with actual user data when implementing real auth
  
  const isActive = (path: string) => location.pathname === path;
  
  // Different navigation items based on auth status
  const publicNavigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
  ];

  const authenticatedNavigationItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Knowledge Base', path: '/knowledge-base' },
    { name: 'Settings', path: '/settings' },
  ];

  const navigationItems = isAuthenticated ? authenticatedNavigationItems : publicNavigationItems;

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-serif font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LegitMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-muted/50 ${
                  isActive(item.path) 
                    ? 'text-primary bg-primary/10 border border-primary/20' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={(e) => {
                  // Handle features navigation with smooth scrolling
                  if (item.path === '/#features') {
                    e.preventDefault();
                    const featuresSection = document.getElementById('features');
                    if (featuresSection) {
                      featuresSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              // Authenticated user options
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {user.initial}
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({ title: "Logout", description: "You have been logged out successfully." })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              // Public user options
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/onboarding">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  }`}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    // Handle features navigation with smooth scrolling
                    if (item.path === '/#features') {
                      e.preventDefault();
                      const featuresSection = document.getElementById('features');
                      if (featuresSection) {
                        featuresSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                {isAuthenticated ? (
                  // Authenticated mobile options
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="w-8 h-8 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {user.initial}
                      </div>
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({ title: "Logout", description: "You have been logged out successfully." })}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  // Public mobile options
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button variant="hero" size="sm" asChild>
                      <Link to="/onboarding">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};