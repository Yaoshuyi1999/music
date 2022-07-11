// 统一导出所有的接口

// 将home里面的内容按需导入
import {recommendMusic,newMusic} from "./Home"
// 按需导出
export const recommendMusicAPI = recommendMusic
export const newMusicAPI=newMusic

import {searchHot,searchResult} from "./Search"
export const searchHotAPI=searchHot
export const searchResultAPI=searchResult

import {getSongById,getLyricById} from "./Play"
export const getSongByIdAPI=getSongById
export const getLyricByIdAPI=getLyricById