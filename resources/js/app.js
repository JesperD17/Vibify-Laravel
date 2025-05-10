import './bootstrap';

import { loadingBeforeSubmit, showChangeAvatarForm } from "./forms";
import { openCloseMenu } from "./headerMenuIcon";
import { searchSongs } from './searchSongs';
import { skeletonSongs } from './skeletonItems';
import { fetchData } from './homePageSongs';

window.myApp = {
    loadingBeforeSubmit, showChangeAvatarForm,
    openCloseMenu,
    searchSongs,
    skeletonSongs,
    fetchData,
}