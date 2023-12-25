import { type IconType } from '~/libs/types/types.js';

import { iconNameToSvgIcon } from './common.js';

type Properties = {
  iconName: IconType;
  className?: string | undefined;
  onClick?: () => void | undefined;
};

const Icon: React.FC<Properties> = ({
  iconName,
  className,
  onClick,
}: Properties) => {
  const SvgIcon = iconNameToSvgIcon[iconName] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  return <SvgIcon className={className} onClick={onClick} />;
};

export { Icon };
