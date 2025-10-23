type threatenedSpecies = {
    level: string,
    code: string,
    color: string
    label: string,
}

// Based on IUCN
export const threatenedSpecies:threatenedSpecies[] = [
    { level: "0", code: "NE", color: "bg-[#FFFFFF]", label: "Chưa được đánh giá" },
    { level: "1", code: "DD", color: "bg-[#D1D1C6]", label: "Thiếu dữ liệu" },
    { level: "2", code: "LC", color: "bg-[#60C659]", label: "Ít quan tâm" },
    { level: "3", code: "NT", color: "bg-[#CCE226]", label: "Sắp bị đe dọa" },
    { level: "4", code: "VU", color: "bg-[#F9E814]", label: "Sắp nguy cấp" },
    { level: "5", code: "EN", color: "bg-[#FC7F3F]", label: "Nguy cấp" },
    { level: "6", code: "CR", color: "bg-[#D81E05]", label: "Cực kỳ nguy cấp" },
    { level: "7", code: "EW", color: "bg-[#542344]", label: "Tuyệt chủng trong tự nhiên" },
    { level: "8", code: "EX", color: "bg-[#000000]", label: "Tuyệt chủng" },
]