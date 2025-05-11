export default function ApplicationLogo(props) {
    return (
        <img
            src="/assets/images/pig.webp"
            alt="Logo"
            className={props.className ?? 'w-12'}
            height={props.height}
            draggable="false"
        />
    );
}
