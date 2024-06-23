import './Button.scss';

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
};

export const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
    return (
        <button className={`${className} action-button`} onClick={onClick}>
            {children}
        </button>
    );
};