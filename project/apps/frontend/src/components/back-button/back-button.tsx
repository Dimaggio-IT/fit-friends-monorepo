import { useNavigate } from 'react-router-dom';

type BackButtonProps = {
  className: string;
};

function BackButton({ className }: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      className={`btn-flat ${className}`}
      type="button"
      onClick={(params) => {
        navigate(-1);
      }}
    >
      <svg width={14} height={10} aria-hidden="true">
        <use xlinkHref="#arrow-left" />
      </svg>
      <span>Назад</span>
    </button>
  );
}

export { BackButton };
