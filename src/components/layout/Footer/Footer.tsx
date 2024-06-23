import { Button } from '../../common/Button/Button';
import './Footer.scss';

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className='footer'>
            <div className='footer-block'>
                <p className='footer-data'>
                    Some footer info
                </p>
                <Button onClick={scrollToTop}> Go to Top</Button>
            </div>
        </footer>
    )
}