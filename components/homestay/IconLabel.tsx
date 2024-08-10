import React, { ReactElement } from "react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  icon: JSX.Element;
  separator?: JSX.Element;
}>;

const IconLabel = ({ icon, separator, children }: Props) => {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <div className="flex items-center space-x-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as ReactElement<any>, {
              className: "mx-1",
            });
          }
          return child;
        })}
        {separator && <div className="mx-1">{separator}</div>}
      </div>
    </div>
  );
};

export default IconLabel;
