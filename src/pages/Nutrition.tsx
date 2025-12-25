import { useState } from 'react'
import { MdImageSearch } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../components/Loader';

const Nutrition = () => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [loadingOCR, setLoadingOCR] = useState(false);
    const [loadingAnalysis, setLoadingAnalysis] = useState(false);


    const [ocrText, setOcrText] = useState("");
    const [annotatedImage, setAnnotatedImage] = useState("");

    const [analysis, setAnalysis] = useState<any>(null);

    const [lastImgName, setLastImgName] = useState<string | null>(null);

    const ocrApi = import.meta.env.VITE_OCR_API_URL;

    function getImageName(file: File): string {
        return file.name + "_" + file.size;
    }


    const handleFullAnalysis = async () => {
        if (!image) return toast.info("Zəhmət olmasa şəkil seçin!");
        console.log(image);

        const currentImgName = getImageName(image);

        if (currentImgName == lastImgName) {
            toast.info('Image is already analyzed! Please select another image.')
            return
        }

        setAnalysis(null);
        setOcrText("");
        setAnnotatedImage("");


        setLoadingOCR(true);

        let ocrTextValue = "";


        try {

            // 1. ocr request
            const formData = new FormData();
            formData.append("file", image);

            const ocrRes = await fetch(`${ocrApi}/ocr`, {
                method: "POST",
                body: formData,
            });

            const ocrData = await ocrRes.json();

            ocrTextValue = ocrData.text;

            setOcrText(ocrTextValue);
            setAnnotatedImage(ocrData.annotated_image);

        } catch (err) {
            toast.error("OCR failed.");
            console.error(err);
            setLoadingOCR(false);
            return;
        }
        console.log('ocrTextValue', ocrTextValue);


        setLoadingOCR(false)

        setLoadingAnalysis(true)

        if (ocrTextValue) {

            try {

                // 2. analysis request
                const analyzeRes = await fetch(`${ocrApi}/analyze`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: ocrTextValue }),
                });

                const analyzeData = await analyzeRes.json();
                setAnalysis(analyzeData);


            } catch (err) {
                toast.error("Health analysis failed");
                console.error(err);
            }
        }


        setLoadingAnalysis(false)


        setLastImgName(currentImgName)
    };

    // const handleAnalyze = async () => {
    //     if (!ocrText.trim()) return toast.info("Mətn tapılmadı!");

    //     setLoading(true);

    //     try {
    //         const res = await fetch(`${ocrApi}/analyze`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ text: ocrText }),
    //         });

    //         const data = await res.json();


    //         setAnalysis(data);
    //     } catch (err) {
    //         toast.error("AI analizində xəta baş verdi");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // ---------- BADGE COLORS ----------
    const nutriColors: any = {
        "A": "bg-green-600",
        "B": "bg-green-400",
        "C": "bg-yellow-400",
        "D": "bg-orange-500",
        "E": "bg-red-600",
    };

    const nutriLabels: any = {
        A: "Very Healthy",
        B: "Healthy",
        C: "Average",
        D: "Less Healthy",
        E: "Unhealthy",
    };

    // const healthColor = (score: number) => {
    //     if (score >= 80) return "bg-green-600";
    //     if (score >= 50) return "bg-yellow-400";
    //     return "bg-red-600";
    // };

    return (
        <div className="flex flex-col items-center gap-2 mb-4">

            <h1 className="text-3xl font-bold mb-4">NutriScore Check</h1>

            <div className="flex flex-wrap items-center justify-center gap-3 ml-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                    <span className="px-3 py-1 text-white font-bold rounded-md bg-green-600">A</span>
                    <span>Healthiest</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="px-3 py-1 text-white font-bold rounded-md bg-green-400">B</span>
                    <span>Healthy</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="px-3 py-1 text-white font-bold rounded-md bg-yellow-400">C</span>
                    <span>Average</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="px-3 py-1 text-white font-bold rounded-md bg-orange-500">D</span>
                    <span>Unhealthy</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="px-3 py-1 text-white font-bold rounded-md bg-red-600">E</span>
                    <span>Least healthy</span>
                </div>
            </div>


            <p className="text-gray-700 mb-6 leading-relaxed">
                Upload a photo of a product’s ingredients or nutrition label.
                The system will analyze harmful ingredients, allergens, and nutritional quality,
                and provide a Nutri-Score (A–E) result.
                <br />
                You will receive the following information:
            </p>

            <ul className="text-gray-700 mb-6 list-disc pl-6 leading-relaxed">
                <li>Harmful or risky ingredients</li>
                <li>Allergens</li>
                <li>Nutritional concerns and calorie info</li>
                <li>Nutri-Score (A–E)</li>
                {/* <li>0–100 arası sağlamlıq balı</li> */}
                <li>General recommendation and product summary</li>
            </ul>

            {/* Upload box */}
            {!loadingOCR && !loadingAnalysis && (
                <>
                    <label className="max-w-lg cursor-pointer w-full p-6 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center hover:bg-gray-100">
                        <p className="text-gray-600 text-lg">📸 Click to upload an image</p>
                        <input type="file" accept="image/*" className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setImage(file);

                                if (file) setPreview(URL.createObjectURL(file));
                            }}
                        />
                        {/* Show preview */}
                        {preview && (
                            <div className="mt-4">
                                <p className="text-gray-600 mb-2">Selected image:</p>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full max-h-96 object-contain rounded-lg shadow-md"
                                />
                            </div>
                        )}
                    </label>

                    <button
                        onClick={handleFullAnalysis}
                        className="flex items-center cursor-pointer gap-1 px-4 py-2 mt-2 bg-blue-600 text-xl text-white rounded-lg active:scale-95"
                    >
                        Run Health Analysis
                        <MdImageSearch />
                    </button>
                </>
            )}

            {/* Loader */}
            {loadingOCR && (
                <div className="mt-4 text-center">
                    <Loader />
                    <p className="text-blue-500 font-medium mt-2">Analyzing, please wait...</p>
                </div>
            )}

            {/* Results */}
            {!loadingOCR && ocrText && (
                <div className="mt-6">

                    {/* Editable text */}
                    <h2 className="text-xl font-semibold mb-2">Extracted Text</h2>
                    <textarea
                        readOnly
                        className="w-full p-3 border rounded-lg bg-gray-100 h-40"
                        value={ocrText}
                        onChange={(e) => setOcrText(e.target.value)}
                    />

                    {/* Annotated image */}
                    <h2 className="text-xl font-semibold mt-6 mb-2">Image</h2>
                    <img
                        src={annotatedImage}
                        alt="Annotated OCR"
                        className="w-full rounded-lg shadow max-h-96"
                    />

                    {/* <button
                        onClick={handleAnalyze}
                        className="cursor-pointer px-4 py-2 mt-4 bg-green-600 text-white rounded-lg text-lg active:scale-95"
                    >
                        Run Health Analysis
                    </button> */}
                </div>
            )}

            {/* ANALYSIS LOADER */}
            {loadingAnalysis && (
                <div className="text-center mt-4">
                    <Loader />
                    <p className="text-blue-500 mt-2">Analyzing nutrition...</p>
                </div>
            )}

            {/* Final Health Analysis */}
            {analysis && (
                <div className="mt-8 p-5 bg-gray-100 rounded-xl shadow">

                    {/* Nutri Score Badge */}
                    <div className={`inline-block px-4 py-2 mb-2 text-white text-2xl font-bold rounded-lg ${nutriColors[analysis.nutri_score]}`}>
                        Nutri-Score: {analysis.nutri_score} ({nutriLabels[analysis.nutri_score]})
                    </div>


                    <div className="flex items-center gap-1 px-3 py-2 bg-white rounded-xl shadow border w-fit">
                        {["A", "B", "C", "D", "E"].map((letter) => (
                            <div
                                key={letter}
                                className={`w-10 h-12 flex items-center justify-center text-xl font-bold rounded-md text-white 
                    ${nutriColors[letter]} 
                    ${letter === analysis.nutri_score ? "scale-110 border-2 border-black" : "opacity-60"}`}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                    {/* Health Score */}
                    {/* <div className={`mt-3 inline-block px-4 py-1 text-white text-lg rounded-lg ${healthColor(analysis.health_score)}`}>
                        Sağlamlıq Balı: {analysis.health_score}/100
                    </div> */}

                    <h3 className="text-xl font-semibold mt-6">Harmful Ingredients</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                        {analysis.harmful_ingredients.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Allergens</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                        {analysis.allergens.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Nutrition Concerns</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                        {analysis.nutrition_concerns.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Recommendation</h3>
                    <p className="text-gray-800">{analysis.recommendation}</p>
                </div>
            )}
            <ToastContainer position='top-center' hideProgressBar autoClose={940} />
        </div>
    )
}

export default Nutrition