import Innertube, { UniversalCache } from "youtubei.js";
import Utils from "../utils/index.js";

export default async function (req, _, next) {
    if (req.path === '/proxy')
        return next();

    const visitorData = process.visitorData;
    let poToken = null;
    if (process.env.ENV === 'production' || req.path === '/player')
        poToken = await Utils.GeneratePoToken(visitorData);

    req.innertube = await Innertube.create({
        client_type: 'WEB',
        cache: new UniversalCache(true),
        enable_session_cache: false,
        visitor_data: visitorData,
        po_token: poToken,
    });
    
    next();
}