export default function ApplicationLogo(props) {
    return (
        <img
            src="/assets/images/pig.png"
            alt="Logo"
            className={props.className ?? 'w-12'}
            height={props.height}
            draggable="false"
        />
    );
}
