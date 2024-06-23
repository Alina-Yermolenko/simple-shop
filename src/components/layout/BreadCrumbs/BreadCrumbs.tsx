import './BreadCrumbs.scss';
import { Link, useLocation } from 'react-router-dom';

export const BreadCrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').map((x) => x);

    return (
        <div className="breadcrumb">
            <ul className="breadcrumb-block">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    if (!name.length) {
                        return;
                    }

                    return (
                        <li key={name+index} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                            {isLast ? (
                                name
                            ) : (
                                <Link to={routeTo}>{name}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
