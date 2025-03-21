const Bars = (item: BarProps) => {
    const {text, style, heading, textStyle}= item.item
    return (
        <div className="container mx-auto">
            <div className={`cursor-pointer flex flex-col items-center ${style}`}>
                <p className={` font-normal font-blinker ${textStyle}`}>{text}</p>
                <h1 className={`text-4xl hover:drop-shadow-md font-abc font-semibold pt-4 pb-1`}>{heading}</h1>
            </div>
        </div>
    );
};

export default Bars;

export  interface BarProps {
    item: BarDesign,
    id: string;
}

export  interface BarDesign {
    style: string;
    heading: string;
    text: string;
    textStyle: string;
}