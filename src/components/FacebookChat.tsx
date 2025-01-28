
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookChat = () => {
    return (
        <FacebookProvider appId="1002269518275620" chatSupport>
         <CustomChat pageId="292736671144659" minimized={true}/>
       </FacebookProvider> 
    );
};

export default FacebookChat;