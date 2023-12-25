import { type UserAuthResponse } from '~/packages/users/libs/types/types.js';
import { Image } from '~/libs/components/image/image.js';
import profile from '~/assets/img/profile-pic.jpg';
import styles from './styles.module.scss';
import {
  useAppForm,
  useCallback,
  useMemo,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { type UserUpdateRequestDto } from '~/packages/users/libs/types/types.js';
import { userUpdateValidationSchema } from '~/packages/users/libs/validation-schemas/validation-schemas.js';
import { Button, Input } from '~/libs/components/components.js';
import { type MutableRefObject } from 'react';

type Properties = {
  user: UserAuthResponse;
  onUpdateDetailsSubmit: (payload: UserUpdateRequestDto) => void;
  onUpdateProfilePic: (event: React.MutableRefObject<HTMLInputElement>) => void;
};

const PersonalDetailsEdit: React.FC<Properties> = ({
  user,
  onUpdateDetailsSubmit,
  onUpdateProfilePic,
}: Properties) => {
  const inputFileReference = useRef<HTMLInputElement>();
  const credentialsFormValues = useMemo(
    () => ({
      email: user.email,
      password: '',
    }),
    [user],
  );

  const { control: credentialsControl, errors: credentialsErrors } = useAppForm(
    {
      defaultValues: credentialsFormValues,
    },
  );

  const { control, errors, handleSubmit } = useAppForm<UserUpdateRequestDto>({
    defaultValues: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validationSchema: userUpdateValidationSchema,
  });

  const [image, setImage] = useState<{
    src: string;
    blob: Blob;
  } | null>(null);

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      const [newImage] = event.target.files ?? [];

      if (newImage) {
        reader.addEventListener('load', () => {
          setImage({
            src: reader.result as string,
            blob: newImage,
          });
        });
        reader.readAsDataURL(newImage);
      }
    },
    [setImage],
  );

  const handleFormSubmit = useCallback((event_: React.BaseSyntheticEvent) => {
    handleSubmit((payload) => {
      onUpdateDetailsSubmit(payload);

      return void onUpdateProfilePic(
        inputFileReference as MutableRefObject<HTMLInputElement>,
      );
    })(event_);
  }, []);

  return (
    <div className={styles['edit-details-wrapper']}>
      <div className={styles['edit-details-header']}>
        <span className={styles['edit-details-header-title']}>Personal</span>
      </div>
      <form
        className={styles['edit-details-content']}
        onSubmit={handleFormSubmit}
      >
        <label className={styles['profile-image-wrapper']}>
          <Image
            src={image?.src ?? user?.avatarUrl ?? profile}
            alt="avatar"
            className={styles['profile-image']}
          />
          <input
            type="file"
            className="visually-hidden"
            onChange={handleImageChange}
            ref={inputFileReference as React.MutableRefObject<HTMLInputElement>}
          />
        </label>
        <div className={styles['inputs']}>
          <Input
            control={control}
            errors={errors}
            label="First name"
            name="firstName"
          />
          <Input
            control={control}
            errors={errors}
            label="Last name"
            name="lastName"
          />
          <Input
            control={control}
            errors={errors}
            label="Username"
            name="username"
          />

          <Input
            isDisabled={true}
            control={credentialsControl}
            errors={credentialsErrors}
            label="Email"
            name="email"
          />

          <Input
            isDisabled={true}
            control={credentialsControl}
            errors={credentialsErrors}
            label="Password"
            name="password"
          />
        </div>
        <Button className={styles['submit-btn']} type="submit" label="Save" />
      </form>
      <></>
    </div>
  );
};

export { PersonalDetailsEdit };
