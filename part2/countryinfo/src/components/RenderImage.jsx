const RenderImage = ({imageLink}) => {
    if (imageLink === null) {
        return null
    }
    return (
        <img
            src={imageLink}
        />
    )
    }

export default RenderImage