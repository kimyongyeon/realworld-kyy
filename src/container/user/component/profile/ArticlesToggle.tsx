import React, { useEffect, useState } from 'react';

export const ArticlesToggle = () => {
  const [active, setActive] = useState(false);
  const [favolActive, setFavolActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  const isActive = () => {
    return active ? 'nav-link active' : 'nav-link';
  };

  const isFavolActive = () => {
    return favolActive ? 'nav-link active' : 'nav-link';
  };

  return (
    <>
      <div className="articles-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a
              className={isActive()}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setFavolActive(false);
                setActive(true);
              }}
            >
              My Articles
            </a>
          </li>
          <li className="nav-item">
            <a
              className={isFavolActive()}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setFavolActive(true);
                setActive(false);
              }}
            >
              Favorited Articles
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
