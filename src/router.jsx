import { useCallback, useEffect, useState } from 'react';

export function getHashPath() {
  const h = window.location.hash.replace(/^#/, '') || '/';
  const [path] = h.split('?');
  return path === '' ? '/' : path;
}

export function useHashRoute() {
  const [path, setPath] = useState(getHashPath);
  useEffect(() => {
    const onChange = () => {
      setPath(getHashPath());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

export function navigate(to) {
  if (to.startsWith('#')) {
    window.location.hash = to.slice(1);
  } else if (to.startsWith('/')) {
    window.location.hash = to;
  } else {
    window.location.hash = `/${to}`;
  }
}

export function Link({ to, children, className = '', onClick, ...rest }) {
  const handle = useCallback(
    (e) => {
      if (onClick) onClick(e);
      if (e.defaultPrevented) return;
      e.preventDefault();
      navigate(to);
    },
    [to, onClick],
  );
  const href = `#${to.startsWith('/') ? to : `/${to}`}`;
  return (
    <a href={href} className={className} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
