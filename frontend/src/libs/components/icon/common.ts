import { ReactComponent as DropdownIcon } from '~/assets/img/dropdown.svg';
import { ReactComponent as CoinsIcon } from '~/assets/img/coins.svg';
import { ReactComponent as XIcon } from '~/assets/img/xmark.svg';
import { ReactComponent as MagnifyingGlass } from '~/assets/img/magnifying-glass.svg';
import { ReactComponent as ArrowLeft } from '~/assets/img/arrow-left.svg';
import { ReactComponent as EllipsisVertical } from '~/assets/img/ellipsis-vertical.svg';
import { ReactComponent as Pencil } from '~/assets/img/pencil.svg';
import { type IconType } from '~/libs/types/types.js';

const iconNameToSvgIcon: Record<
  IconType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  'dropdown': DropdownIcon,
  'coins': CoinsIcon,
  'x-icon': XIcon,
  'magnifying-glass': MagnifyingGlass,
  'arrow-left': ArrowLeft,
  'ellipsis-vertical': EllipsisVertical,
  'pencil': Pencil,
};

export { iconNameToSvgIcon };
