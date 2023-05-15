import { AlertIcon, AnalysisIcon, AvailableIcon, BarcodeScannerIcon, QRCodeIcon, UserFriendlyIcon } from "../../assets/SVG";

const FeatureInfo = [
    {
        id: 1,
        icon: BarcodeScannerIcon,
        heading: "Barcode Based",
        borderColor: "#f15440",
        aos: "flip-right",
        body: "Incorporating products into the inventory becomes efficient and rapid through the utilization of a barcode-based system."
    }, 
    {
        id: 2,
        icon: AlertIcon,
        heading: "Expiration Alert System",
        borderColor: "#44b39c",
        aos: "flip-down",
        body: "The system notifies users of products that are about to expire within a specified time limit, which helps in reducing waste and increasing profitability."
    },
    {
        id: 3,
        icon: QRCodeIcon,
        heading: "QR System",
        aos: "flip-left",
        borderColor: "#53c0eb",
        body: "The utilization of QR codes has streamlined the process of selling products and viewing their details.."
    },
    {
        id: 4,
        icon: AnalysisIcon,
        heading: "Easy Analysis",
        aos: "flip-right",
        borderColor: "#027de5",
        body: "Users have the ability to examine their present and previously sold stock, thereby acquiring knowledge that facilitates critical analysis of their inventory."
    },
    {
        id: 5,
        icon: UserFriendlyIcon,
        heading: "User Friendly",
        borderColor: "#ffe103",
        aos: "flip-up",
        body: "The application is simple to utilize and control, which improves its versatility and improves the overall user satisfaction."
    },
    {
        id: 6,
        icon: AvailableIcon,
        heading: "Available 24/7",
        borderColor: "#999999",
        aos: "flip-left",
        body: "As a result of utilizing a cloud-based storage system, users can retrieve information regarding their inventory from any location and at any time."
    }
]

export default FeatureInfo