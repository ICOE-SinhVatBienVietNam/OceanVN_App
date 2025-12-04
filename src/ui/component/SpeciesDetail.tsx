// Import libraries
import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { useLocation } from "react-router"

// Config
import { routeConfig } from "../../config/routeConfig"
import { threatenedSpecies } from "../../config/threatenedSpecies"
import { SpeciesService } from "../../services/speciesService"
const speciesService = new SpeciesService()

// Images
import Logo from "../../assets/SinhVatBienVN.png"

// Type
import { Species_Type } from "../../services/speciesService"

// Config
import { toastConfig } from "../../config/toastConfig"
import { cloudinaryRoot } from "../../config/gateway"
import { useIonRouter } from "@ionic/react"

// Component
import Error404 from "./Error404"

// Redux
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { setSpeciesDetail, setSpeciesDetailID } from "../../redux/state/speciesReducer"

interface SpeciesDetail_interface {
    closeSpeciesDeatail: () => void,
    speciesLocation?: () => void
}

const SpeciesDetail: React.FC<SpeciesDetail_interface> = ({ closeSpeciesDeatail, speciesLocation }) => {
    // Message
    const noDataMessage = useRef<string>("Chưa có dữ liệu")

    // SpeciesDetail
    const speciesDetailID = useSelector((state: RootState) => state.species.speciesDetailID)
    const speciesDetailDataCache = useSelector((state: RootState) => state.species.speciesDetail)
    const dispatch = useDispatch()

    const [speciesName, setSpeciesName] = useState<[string, string]>()

    const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

    const openLightbox = (url: string) => {
        // if (url === Logo) return
        setSelectedImageUrl(url);
        setIsLightboxOpen(true);
    };

    // ThreatenedSpecies
    const [threatenedLevel, setThreatenedLevel] = useState<number | undefined>()

    useEffect(() => {
        if (speciesDetailID && speciesDetailID != speciesDetailDataCache.id) {
            (async () => {
                const speciesData = await speciesService.getSpeciesID(speciesDetailID)
                if (speciesData) {
                    const getThreatenedLevel = threatenedSpecies.find(lv => lv.code === speciesData.threatened_symbol)?.level
                    if (getThreatenedLevel != null) setThreatenedLevel(parseInt(getThreatenedLevel))
                    const splitSpeciesName: [string, string] = [speciesData.species.split(" ").slice(0, 2).join(" "), speciesData.species.split(" ").slice(2).join(" ")];
                    setSpeciesName(splitSpeciesName)
                    dispatch(setSpeciesDetailID(speciesData.id))
                    dispatch(setSpeciesDetail(speciesData))
                }
            })()
        } else {
            if (!speciesDetailDataCache.species) return
            const getThreatenedLevel = threatenedSpecies.find(lv => lv.code === speciesDetailDataCache.threatened_symbol)?.level
            if (getThreatenedLevel != null) setThreatenedLevel(parseInt(getThreatenedLevel))
            const splitSpeciesName: [string, string] = [speciesDetailDataCache.species.split(" ").slice(0, 2).join(" "), speciesDetailDataCache.species.split(" ").slice(2).join(" ")];
            setSpeciesName(splitSpeciesName)
            dispatch(setSpeciesDetailID(speciesDetailDataCache.id))
            dispatch(setSpeciesDetail(speciesDetailDataCache))
        }

    }, [speciesDetailID])

    // Share link
    const [readyCloseShareLink, setReadyCloseShareLink] = useState<boolean>(false)
    const [isShareLink, setIsShareLink] = useState<boolean>(false)
    const [shareLink, setShareLink] = useState<string>()
    const copyLink = async () => {
        if (shareLink) {
            await navigator.clipboard.writeText(shareLink)
                .then(() => {
                    toastConfig({
                        toastType: 'success',
                        toastMessage: 'Đã copy'
                    })
                })
                .catch(() => {
                    toastConfig({
                        toastType: 'error',
                        toastMessage: 'URL không khả dụng'
                    })
                })
        }
    }

    const toggleShareLink = () => {
        setReadyCloseShareLink(!readyCloseShareLink)
        setTimeout(() => {
            setIsShareLink(!isShareLink)
        }, 200)
    }

    useEffect(() => {
        const linkForShare = window.location.origin + "/public-shared/" + speciesDetailID
        setShareLink(linkForShare)
    }, [speciesDetailID])

    // Location path
    const location = useLocation()
    const router = useIonRouter()

    const viewMorePosition = () => {
        switch (location.pathname) {
            case routeConfig.main.discover:
                router.push(`${routeConfig.main.map}/${speciesDetailID}`, "forward")
                break;

            default:
                if (speciesLocation) {
                    speciesLocation()
                }
                break;
        }
    }

    const [isCloseSpeciesDeatail, setIsCloseSpeciesDeatail] = useState<boolean>(false)
    const handleCloseSpeciesDetail = () => {
        setIsCloseSpeciesDeatail(true)

        setTimeout(() => {
            closeSpeciesDeatail()
        }, 100)
    }

    return (
        <motion.div
            initial={{ x: !isCloseSpeciesDeatail ? "100%" : 0 }}
            animate={{ x: !isCloseSpeciesDeatail ? 0 : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 100 }}
            className="mainShadow absolute z-10 bottom-0 left-0 h-full w-full bg-white flex flex-col gap-5 pt-2.5"
        >

            <span className="flex justify-between items-center px-mainTwoSidePadding">
                <button className="mainShadow flex justify-center-safe items-center-safe h-7.5 aspect-square !rounded-full" onClick={handleCloseSpeciesDetail}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <span className="w-fit flex items-center gap-1.5">
                    <button className="mainShadow flex items-center text-csNormal gap-1 !p-2.5 !rounded-small" onClick={viewMorePosition}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        Phân bố
                    </button>

                    <button className="mainShadow flex items-center text-csNormal gap-1 !p-2.5 !rounded-small" onClick={toggleShareLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </button>

                    <button className="mainShadow flex items-center text-csNormal gap-1 !p-2.5 !rounded-small">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>

                    </button>
                </span>
            </span>

            <span className="relative flex-1 h-0 flex flex-col overflow-y-auto gap-2.5 pb-2.5 pt-0.5 px-mainTwoSidePadding">
                {(!speciesDetailDataCache || !speciesDetailDataCache.id) && !speciesDetailID ? (
                    <Error404 />
                ) : (
                    speciesDetailID !== speciesDetailDataCache.id ? (
                        <Error404 />
                    ) : (

                    <>
                        <div className="flex flex-wrap gap-2.5 mb-2.5">
                            <button className="mainShadow text-csNormal !py-1 !px-2.5 !rounded-small">Tên bộ (30)</button>
                            <button className="mainShadow text-csNormal !py-1 !px-2.5 !rounded-small">Tên họ (15)</button>
                        </div>

                        <div className="relative mainShadow !h-[200px] flex-shrink-0 rounded-main overflow-hidden">
                            <span className="absolute top-0 left-0 bg-[rgba(0,0,0,0.75)] px-2.5 py-1.5">
                                <p className="text-white text-csNormal">
                                    {speciesDetailDataCache.thumbnails ? speciesDetailDataCache.thumbnails.length : 0} <i className="far fa-images text-white"></i>
                                </p>
                            </span>
                            {(() => {
                                if (speciesDetailDataCache.thumbnails && speciesDetailDataCache.thumbnails.length > 1) {
                                    return (
                                        <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory">
                                            {speciesDetailDataCache.thumbnails.map((thumbnail, index) => (
                                                <div key={index} className="w-full h-full flex-shrink-0 snap-center flex justify-center items-center p-2.5 cursor-pointer" onClick={() => openLightbox(thumbnail.thumbnail)}>
                                                    <img src={cloudinaryRoot + thumbnail.thumbnail} className="h-full object-cover object-center" loading="lazy" />
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }

                                const imageUrl = (speciesDetailDataCache.thumbnails && speciesDetailDataCache.thumbnails.length === 1)
                                    ? speciesDetailDataCache.thumbnails[0].thumbnail
                                    : Logo;

                                return (
                                    <div className="w-full h-full flex justify-center items-center p-2.5 cursor-pointer" onClick={() => openLightbox(imageUrl)}>
                                        <img src={cloudinaryRoot + imageUrl} className="h-full object-cover object-center" />
                                    </div>
                                );
                            })()}
                        </div>

                        <span className="flex flex-col items-center-safe py-2.5">
                            <h4 className="leading-0 !font-medium text-wrap text-center">
                                <i>{speciesName?.[0]}</i> {speciesName?.[1]}
                            </h4>

                            <p className="text-csBig text-gray"><b className="text-gray">Nhóm: </b>{speciesDetailDataCache.group}</p>
                        </span>

                        <span className={`w-full flex ${threatenedLevel != null && "border border-lighterGray mt-2.5 mb-2.5"}`}>
                            {speciesDetailDataCache.threatened_symbol && threatenedLevel != null ? (
                                threatenedSpecies.map((level, index) => {
                                    return (
                                        <span key={index} className={`relative flex-1 h-3 ${(index <= threatenedLevel) && level.color}`}>
                                            {index === threatenedLevel && (
                                                <>
                                                    <p className="absolute bottom-full left-1/2 h-fit w-fit translate-x-[-50%] translate-y-[-20%] text-nowrap font-medium text-csNormal">{level.code}</p>
                                                    <p className={`absolute top-full ${threatenedLevel == 0 && "left-0! translate-x-0!"} ${threatenedLevel == 8 && "right-0! translate-x-0!"} left-1/2 h-fit w-fit translate-x-[-50%] translate-y-[20%] text-nowrap font-medium text-csNormal`}>{level.label}</p>
                                                </>
                                            )}
                                        </span>
                                    )
                                })

                            ) : (
                                <p className="w-full text-center text-csNormal font-medium">Chưa có dữ liệu về <i className="text-mainRed">Tình trạng bảo tồn</i></p>
                            )}
                        </span>

                        <span className="flex flex-col gap-2.5 text-csNormal">
                            <span className="flex flex-col">
                                <h5 className="font-semibold text-lg">Tên tiếng Việt</h5>
                                <ul className="list-none text-gray pl-2.5">
                                    {speciesDetailDataCache.common_names && speciesDetailDataCache.common_names.length > 0 ? (
                                        speciesDetailDataCache.common_names.map((name, i) => {
                                            return <li key={i} className="text-gray font-medium">{name.name}</li>
                                        })
                                    ) : "Chưa có"}
                                </ul>
                            </span>

                            <span className="flex flex-col">
                                <h5 className="font-semibold text-lg">Mô tả</h5>
                                <ul className="list-none text-gray pl-2.5">
                                    {speciesDetailDataCache.description ? (
                                        <p className="text-gray text-justify pl-2.5">{speciesDetailDataCache.description}</p>
                                    ) : noDataMessage.current}
                                </ul>
                            </span>

                            <span className="flex flex-col">
                                <h5 className="font-semibold text-lg">Đặc điểm</h5>
                                <ul className="list-none text-gray pl-2.5">
                                    {speciesDetailDataCache.characteristic ? (
                                        <p className="text-gray text-justify pl-2.5">{speciesDetailDataCache.characteristic}</p>
                                    ) : noDataMessage.current}
                                </ul>
                            </span>

                            <span className="flex flex-col">
                                <h5 className="font-semibold text-lg">Nơi sống</h5>
                                <ul className="list-none text-gray pl-2.5">
                                    {speciesDetailDataCache.habitas ? (
                                        <p className="text-gray text-justify pl-2.5">{speciesDetailDataCache.habitas}</p>
                                    ) : noDataMessage.current}
                                </ul>
                            </span>

                            <span className="flex flex-col">
                                <h5 className="font-semibold text-lg">Vai trò</h5>
                                <ul className="list-none text-gray pl-2.5">
                                    {speciesDetailDataCache.impact ? (
                                        <p className="text-gray text-justify pl-2.5">{speciesDetailDataCache.impact}</p>
                                    ) : noDataMessage.current}
                                </ul>
                            </span>

                            <span className="flex flex-col">
                                <h5 className="font-semibold text-lg">Phân bố</h5>
                                <ul className="list-none text-gray pl-2.5">
                                    <li>
                                        <p className="text-gray flex gap-1.5 pl-2.5">
                                            <b className="text-gray flex text-nowrap gap-1.5 w-fit">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
                                                    <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#c93728"></rect>
                                                    <path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path>
                                                    <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path>
                                                    <path fill="#ff5" d="M18.008 16.366L21.257 14.006 17.241 14.006 16 10.186 14.759 14.006 10.743 14.006 13.992 16.366 12.751 20.186 16 17.825 19.249 20.186 18.008 16.366z"></path>
                                                </svg>
                                                Việt Nam:
                                            </b>
                                            {speciesDetailDataCache.distribution_vietnam}
                                        </p>
                                    </li>

                                    <li>
                                        <p className="text-gray flex gap-1.5 pl-2.5">
                                            <b className="text-gray flex text-nowrap gap-1.5 w-fit">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-mainDarkBlue">
                                                    <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z" clipRule="evenodd" />
                                                </svg>

                                                Thế giới:
                                            </b>
                                            {speciesDetailDataCache.distribution_world}
                                        </p>
                                    </li>
                                </ul>
                            </span>

                            <span className="flex flex-col">
                                <h5 className="font-semibold text-lg">Phân loại sinh học</h5>
                                <ul className="list-none text-gray pl-2.5">
                                    <li className="text-gray"><span className="font-bold text-gray">Ngành: </span>{speciesDetailDataCache.phylum ? speciesDetailDataCache.phylum : noDataMessage.current}</li>
                                    <li className="text-gray"><span className="font-bold text-gray">Lớp: </span>{speciesDetailDataCache.class ? speciesDetailDataCache.class : noDataMessage.current}</li>
                                    <li className="text-gray"><span className="font-bold text-gray">Bộ: </span>{speciesDetailDataCache.order ? speciesDetailDataCache.order : noDataMessage.current}</li>
                                    <li className="text-gray"><span className="font-bold text-gray">Họ: </span>{speciesDetailDataCache.family ? speciesDetailDataCache.family : noDataMessage.current}</li>
                                    <li className="text-gray"><span className="font-bold text-gray">Giống: </span>{speciesDetailDataCache.genus ? speciesDetailDataCache.genus : noDataMessage.current}</li>
                                </ul>
                            </span>

                            <span className="flex flex-col">
                                <h5 className="font-semibold text-lg">Nguồn tham khảo</h5>
                                <ul className="list-none text-gray pl-2.5">
                                    {speciesDetailDataCache.references && speciesDetailDataCache.references.length > 0 ? (
                                        speciesDetailDataCache.references.map((doc, i) => {
                                            return <li key={i} className="text-gray flex items-center-safe gap-1">
                                                <span className="font-bold text-mainRed">({i + 1}) </span>
                                                {doc.display_name}
                                                {doc.path && (
                                                    <a href={doc.path} target="_blank" rel="noopener noreferrer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 stroke-mainRed">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </li>
                                        })
                                    ) : "Không có nguồn tham khảo"}
                                </ul>
                            </span>
                        </span>
                    </>
                    )
                )}
            </span >

    {/* light Box */ }
{
    isLightboxOpen &&
        <motion.div
            className="absolute top-0 left-0 z-20 w-full h-full bg-black/75 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="relative w-full h-full"
                onClick={e => e.stopPropagation()}
            >
                <motion.img
                    src={cloudinaryRoot + selectedImageUrl}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, type: 'spring' }}
                />
            </motion.div>
            <button onClick={() => setIsLightboxOpen(false)} className='absolute top-5 right-5 p-2 bg-black/50 rounded-full z-30'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </motion.div>
}

{/* Share popup */ }
{
    isShareLink && (
        <motion.div
            initial={{ opacity: readyCloseShareLink ? 0 : 1 }}
            animate={{ opacity: readyCloseShareLink ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.75)] flex justify-center-safe items-center-safe"
        >

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-fit w-[90%] bg-white flex flex-col gap-2.5 px-5 pt-2.5 pb-5 rounded-main"
            >
                <div className="h-fit w-full flex items-center-safe justify-between">
                    <h5 className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 stroke-mainRed">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>

                        Chia sẻ liên kết
                    </h5>

                    <button onClick={toggleShareLink} className="px-2.5! py-1!">x</button>
                </div>

                <div className="h-fit w-full">
                    <div className="h-[35px] w-full flex items-center-safe gap-1.5">
                        <span className="h-full flex-1 w-0 bg-lighterGray flex items-center-safe px-2.5 py-2.5 rounded-small" onClick={copyLink}>
                            <p className="text-nowrap truncate text-csNormal">{shareLink}</p>
                        </span>

                        <button className=" mainShadow bg-white h-full aspect-square flex justify-center-safe items-center-safe rounded-small!" onClick={copyLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.div>

        </motion.div>
    )
}
        </motion.div >
    )
}

export default SpeciesDetail
