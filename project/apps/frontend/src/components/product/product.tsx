import { IProductRdo } from '@project/common';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { ProductConstraints, WorkoutSex, UserRole, TUserRole } from '../../common';
import { Popup } from '../popup/popup';

type TProductProps = {
  training: IProductRdo;
  role: TUserRole;
};

const FieldsName = {
  name: 'productTitle',
  level: 'productLevel',
  type: 'productType',
  duration: 'productDuration',
  price: 'productPrice',
  caloriesReset: 'productCaloriesReset',
  description: 'productContent',
  video: 'productVideo',
  isSpecial: 'isProductSpecialOffer',
} as const;

function Product({ training, role }: TProductProps): JSX.Element {
  const isCoach = role === UserRole.Coach;

  const [showModal, setShowModal] = useState(false);
  const handleClosePopupClick = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      id: training.id,
      name: String(formData.get(FieldsName.name)),
      price: Number(formData.get(FieldsName.price)),
      description: String(formData.get(FieldsName.description)),
      isSpecial: isPromo,
    };

    console.log(data);
    setIsEditForm(false);
  };

  const handleVideoSubmit = () => {
    const data = {
      id: training.id,
      videoTitle: String(videoFile),
      videoFile,
    };

    console.log(data);
  };

  const [isEditForm, setIsEditForm] = useState<boolean>(false);
  const handleEditFormClick = () => {
    setIsEditForm((prevIsEditForm) => !prevIsEditForm);
  };

  const [isPromo, setIsPromo] = useState<boolean>(
    training.isSpecial ? training.isSpecial : false
  );
  const handleSetDiscount = () => {
    if (productData.price) {
      setProductData({
        ...productData,
        price: Math.round(
          isPromo ? productData.price / 0.9 : productData.price * 0.9
        ),
      });
    }

    setIsPromo((prevIsDiscount) => !prevIsDiscount);
  };

  const PRODUCT_DATA = {
    name: training.name,
    price: training.price,
    description: training.description,
    isSpecial: training.isSpecial,
    video: training.video,
  };
  const [productData, setProductData] = useState(PRODUCT_DATA);
  const handleProductChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    if (name === 'isSpecial') {
      const newIsSpecial = !productData.isSpecial;
      setProductData({ ...productData, isSpecial: newIsSpecial });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const [videoFile, setVideoFile] = useState<File | undefined>();
  const handleVideoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }

    setVideoFile(evt.target.files[0]);
  };

  const videInputRef = useRef<HTMLInputElement | null>(null);
  const handleVideoDelete = () => {
    if (videInputRef.current) {
      videInputRef.current.value = '';
      setProductData({ ...productData, video: '' });
      setVideoFile(undefined);
    }
  };

  const [isWrongDescription, setIsWrongDescription] = useState<boolean>(false);
  useEffect(() => {
    if (
      productData.description &&
      (productData.description.length < ProductConstraints.Description.MIN ||
        productData.description.length > ProductConstraints.Description.MAX)
    ) {
      setIsWrongDescription(true);
    } else {
      setIsWrongDescription(false);
    }
  }, [productData.description]);

  return (
    <div className="training-card">
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <img
                  src={`#`}
                  width="64"
                  height="64"
                  alt="Изображение тренера"
                />
              </picture>
            </div>
            <div className="training-info__coach-info">
              <span className="training-info__label">Тренер</span>
              <span className="training-info__name">{training.name}</span>
            </div>
          </div>
          {isCoach && isEditForm && (
            <button
              className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--edit"
              type="submit"
              form="training"
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Сохранить</span>
            </button>
          )}
          {isCoach && !isEditForm && (
            <button
              className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
              type="button"
              onClick={handleEditFormClick}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Редактировать</span>
            </button>
          )}
        </div>
        <div className="training-info__main-content">
          <form method="get" id="training" onSubmit={handleFormSubmit}>
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label>
                    <span className="training-info__label">
                      Название тренировки
                    </span>
                    <input
                      type="text"
                      name={FieldsName.name}
                      required
                      minLength={1}
                      maxLength={15}
                      disabled={!isEditForm}
                      value={productData.name}
                      onChange={handleProductChange}
                      data-testid="productName"
                    />
                  </label>
                </div>
                <div className="training-info__textarea">
                  <label>
                    <span className="training-info__label">
                      Описание тренировки
                    </span>
                    <span className="custom-input--error">
                      <textarea
                        id={FieldsName.description}
                        name={FieldsName.description}
                        placeholder=" "
                        disabled={!isEditForm}
                        value={productData.description}
                        onChange={handleProductChange}
                      ></textarea>
                      {isWrongDescription && (
                        <span className="custom-textarea__error">
                          {`Минимальная длина ${ProductConstraints.Description.MIN} символ. Максимальная длина ${ProductConstraints.Description.MAX}
                          символов`}
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label>
                    <span className="training-info__label">Рейтинг</span>
                    <span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </span>
                    <input
                      type="number"
                      name="rating"
                      value={training.rating}
                      disabled
                    />
                  </label>
                </div>
                <ul className="training-info__list">
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{training.type}</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>
                        {training.sex === WorkoutSex.Female &&
                          '#для_женщин'}
                        {training.sex === WorkoutSex.Male && '#для_мужчин'}
                        {training.sex === WorkoutSex.Both && '#для_всех'}
                      </span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{training.amountOfCalories}ккал</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{training.duration}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label>
                    <span className="training-info__label">Стоимость</span>
                    <span className="custom-input__wrapper">
                      <input
                        type="number"
                        name={FieldsName.price}
                        required
                        min="0"
                        disabled={!isEditForm}
                        value={productData.price}
                        onChange={handleProductChange}
                        data-testid="productPrice"
                      />
                      <span className="custom-input__text">₽</span>
                    </span>
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                {!isCoach && (
                  <button
                    className="btn training-info__buy"
                    type="button"
                    onClick={handleClosePopupClick}
                  >
                    Купить
                  </button>
                )}
                {showModal && (
                  <Popup onClose={handleClosePopupClick}>
                    <span>пока здесь пусто</span>
                  </Popup>
                )}
                {isCoach && (
                  <button
                    className="btn-flat btn-flat--light btn-flat--underlined"
                    type="button"
                    onClick={handleSetDiscount}
                    disabled={!isEditForm}
                  >
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-discount"></use>
                    </svg>
                    <span>
                      {isPromo ? 'Отменить скидку' : 'Сделать скидку 10%'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            <input
              className={`${
                productData.video || videoFile || !isEditForm
                  ? 'visually-hidden'
                  : ''
              }`}
              type="file"
              name="import"
              tabIndex={-1}
              accept=".mov, .avi, .mp4"
              ref={videInputRef}
              required
              onChange={handleVideoUpload}
              disabled={!isEditForm}
            />
            {videoFile && (
              <video
                src={URL.createObjectURL(videoFile)}
                width="922"
                height="566"
              ></video>
            )}
            {!videoFile && productData.video && (
              <video src={productData.video} width="922" height="566"></video>
            )}
          </div>
        </div>
        {!isCoach && (
          <div className="training-video__buttons-wrapper">
            <button
              className="btn training-video__button training-video__button--start"
              type="button"
            >
              Приступить
            </button>
          </div>
        )}
        {isCoach && isEditForm && (
          <div
            className="training-video__edit-buttons"
            style={{ display: 'flex' }}
          >
            <button className="btn" type="button" onClick={handleVideoSubmit}>
              Сохранить
            </button>
            <button
              className="btn btn--outlined"
              type="button"
              onClick={handleVideoDelete}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { Product };
