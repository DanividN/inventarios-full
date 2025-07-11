import { Link } from "@inertiajs/react";
import React from "react";

interface ActionMenuProps {
  to: string;
  text: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ to, text }) => {
  return (
    <Link
      href={to}
      className="bg-white text-green-dark font-semibold px-4 py-2 border border-green-dark rounded-md hover:bg-green-100"
    >
      {text}
    </Link>
  );
};

export default ActionMenu;
