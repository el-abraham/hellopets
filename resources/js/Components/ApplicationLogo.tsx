import { ImgHTMLAttributes, SVGAttributes } from 'react';
import HelloPets from '../images/hellopets RBD.png';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img {...props} src={HelloPets} alt="Logo" />
    );
}
