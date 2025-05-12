import './bootstrap';

import { loadingBeforeSubmit, showChangeAvatarForm } from "./forms";
import { openCloseMenu } from "./headerMenuIcon";
import { skeletonSongs } from './skeletonItems';
import { fetchData } from './homePageSongs';

window.myApp = {
    loadingBeforeSubmit, showChangeAvatarForm,
    openCloseMenu,
    skeletonSongs,
    fetchData,
}