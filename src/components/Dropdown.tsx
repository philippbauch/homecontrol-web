import classnames from "classnames";
import React, { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Card } from "./Card";

interface DropdownProps {
  className?: string;
  trigger: (active: boolean) => React.ReactNode;
}

export const Dropdown: React.FunctionComponent<DropdownProps> = ({
  children,
  className,
  trigger,
}) => {
  const [active, setActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleActive = () => setActive(!active);

  useEffect(() => {
    if (!active) {
      return;
    }
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      const clickedOutside =
        menuRef.current && !menuRef.current.contains(event.target);

      const clickedTrigger =
        triggerRef.current && triggerRef.current.contains(event.target);

      if (clickedOutside && !clickedTrigger) {
        setActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [active]);

  return (
    <div className={classnames("dropdown", className)}>
      <div className="dropdown-trigger" ref={triggerRef} onClick={toggleActive}>
        {trigger(active)}
      </div>
      <CSSTransition
        in={active}
        unmountOnExit={true}
        timeout={100}
        classNames="dropdown-menu"
      >
        <Card ref={menuRef} className="dropdown-menu" padded={false}>
          {children}
        </Card>
      </CSSTransition>
    </div>
  );
};
