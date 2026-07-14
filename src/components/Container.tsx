/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean; // If true, removes horizontal padding
}

export const Container: React.FC<ContainerProps> = ({
  children,
  clean = false,
  className = '',
  id,
  ...props
}) => {
  return (
    <div
      id={id}
      className={`w-full max-w-7xl mx-auto ${clean ? '' : 'px-4 sm:px-6 lg:px-8'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
