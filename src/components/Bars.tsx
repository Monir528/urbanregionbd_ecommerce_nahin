/* eslint-disable react/prop-types */

const Bars = ({item}) => {
    const {text, style, heading, textStyle}= item
    return (
        <div className="container">
            <div className={`cursor-pointer flex flex-col items-center ${style}`}>
                <p className={` font-normal font-blinker ${textStyle}`}>{text}</p>
                <h1 className={`text-4xl hover:drop-shadow-md font-abc font-semibold pt-4 pb-1`}>{heading}</h1>
            </div>
        </div>
    );
};

export default Bars;