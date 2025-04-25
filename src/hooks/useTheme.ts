
export const useTheme = () => {
  // Initialize theme from localStorage or default to light
  const getInitialTheme = (): 'light' | 'dark' | 'high-contrast' => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'high-contrast') 
      ? savedTheme 
      : 'light';
  };
  
  const setTheme = (theme: 'light' | 'dark' | 'high-contrast') => {
    localStorage.setItem('theme', theme);
    
    // Remove all theme classes first
    document.documentElement.classList.remove('dark', 'high-contrast');
    
    // Add the appropriate class based on theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'high-contrast') {
      document.documentElement.classList.add('high-contrast');
    }
  };

  const toggleTheme = () => {
    const current = localStorage.getItem('theme') || 'light';
    if (current === 'light') {
      setTheme('dark');
    } else if (current === 'dark') {
      setTheme('high-contrast');
    } else {
      setTheme('light');
    }
  };

  const currentTheme = getInitialTheme();

  return { toggleTheme, currentTheme, setTheme };
};
