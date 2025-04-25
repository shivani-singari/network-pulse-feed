
export const useTheme = () => {
  const setTheme = (theme: 'light' | 'dark') => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };

  const toggleTheme = () => {
    const current = localStorage.getItem('theme') || 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
  };

  return { toggleTheme };
};
