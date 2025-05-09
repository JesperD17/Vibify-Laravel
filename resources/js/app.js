import './bootstrap';

import { loadingBeforeSubmit, showChangeAvatarForm } from "./forms";
import { openCloseMenu } from "./headerMenuIcon";
import { searchSongs } from './searchSongs';
import { skeletonSongs } from './skeletonItems';

window.myApp = {
    loadingBeforeSubmit, 
    showChangeAvatarForm,
    openCloseMenu,
    searchSongs,
    skeletonSongs
}