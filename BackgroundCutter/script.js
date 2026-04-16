let currentMode = "RemoveWhite"

// Collapse Filter Modes
document.getElementById("modesHeader").addEventListener("click", () => {
    const content = document.getElementById("modesContent");
    const btn = document.getElementById("toggleModes");

    const isHidden = content.classList.toggle("hidden");
    btn.textContent = isHidden ? "►" : "▼";
});

// Update mode label
function updateCurrentMode(mode) {
    document.getElementById("modesTitle").textContent = `Filter Modes (Current: ${mode})`;
}

// Mode button logic
document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        // highlight selected mode
        document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // set mode
        currentMode = btn.dataset.mode;
        updateUIForMode(btn.dataset.mode);
        updateCurrentMode(btn.dataset.mode);
        previewChanged();
    });
});   

const modeConfig = {
    RemoveWhite: {
        inputs: {value1: {value:1, min:0, max:256, step:1,},
                label1: {textContent:"Filter's Sensitivity:"},
        },
        visible: ["ValueInput","ClearWasteDropdown","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    RemoveBlack: {
        inputs: {value1: {value:1, min:0, max:256, step:1,},
                label1: {textContent:"Filter's Sensitivity:"},
        },
        visible: ["ValueInput","ClearWasteDropdown","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    RemoveAlpha: {
        inputs: {value1: {value:1, min:0, max:256, step:1,},
            label1: {textContent:"Filter's Sensitivity:"},
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    GreyScale: {
        inputs: {value1: {value:100, min:-100, max:100, step:1},
            label1: {textContent:"Accuracy:"},
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    BlackWhite: {
        inputs: {value1: {value:32, min:0, max:256, step:1,},
                label1: {textContent:"Filter's Sensitivity:"},
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    Invert: {
        inputs: {value1: {value:0, min:0, max:256, step:1,},
                label1: {textContent:"Brightness Threshold:"},
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    ChannelBlend: {
        inputs: {value1: {value:0, min:0, max:256, step:1,},
                label1: {textContent:"Brightness Threshold:"},
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    Delta: {
        inputs: {value1: {value:0, min:0, max:256, step:1,},
                label1: {textContent:"Brightness Threshold:"},
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    ChangeExposure: {
        images : [1,2],
        inputs: {value1: {value:1.3, min:0.0, max:5.0, step:0.1,},
                label1: {textContent:"Exposure Rate:"},
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    Mix: {
        inputs: {value3: {value:"#000000"},
            label3: {textContent:"Color:"}
        },
        visible: ["ColorInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    FilterOutRange: {
        inputs: {value3:{value:"#ffffff"},
            value4:{value:"#000000"},
            label3: {textContent:"Max Color:"},
            label4: {textContent:"Min Color:"}
        },
        visible: ["ColorInput","ColorInput2","ClearWasteDropdown","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    FilterWithinRange: {
        inputs: {value3:{value:"#ffffff"},
            value4:{value:"#000000"},
            label3: {textContent:"Max Color:"},
            label4: {textContent:"Min Color:"}
        },
        visible: ["ColorInput","ColorInput2","ClearWasteDropdown","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    ExtractComponent: {
        inputs: {value1: {value:0, min:0, max:255, step:1,},
            label1: {textContent:"Filter's Sensitivity:"}
        },
        visible: ["ValueInput","ComponentDropdown","ClearWasteDropdown","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    
    MatrixDither: {
        inputs: { 
            value1: { value: 50, min: 1, max: 100, step: 1 },
            label1: { textContent: "Pattern Strength:" },
            value2: { value: 1.0, min: 0.1, max: 5, step: 0.1 },
            label2: { textContent: "Pattern Sensitivity:" }
        },
        visible: ["ValueInput","ValueInput2","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"]
    },
    
    Halftone: {
        inputs: { 
            value1: { value: 8, min: 3, max: 40, step: 1 },
            label1: { textContent: "Dot Size:" },
            otherSelect: { textContent: "Flip Gradient:" },
            
        },
        visible: ["ValueInput","otherSelectDropdown","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"]
    },
    
    // // ColorHalftone: {
    // //     inputs: { 
    // //         value1: { value: 8, min: 2, max: 40, step: 1 },
    // //         label1: { textContent: "Dot Size:" }
    // //     },
    // //     visible: ["ValueInput"]
    // // },

    // RGBHalftone: {
    //     inputs: { 
    //         value1: { value: 8, min: 2, max: 40, step: 1 },
    //         label1: { textContent: "Dot Size:" }
    //     },
    //     visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"]
    // },
    RGBRatio: {
        inputs: { 
            value1: { value: 8, min: 2, max: 40, step: 1 },
            label1: { textContent: "Sample Size:" },
            otherSelect: { textContent: "Scale Extreme:" },
        },
        visible: ["ValueInput","otherSelectDropdown","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"]
    },

    // AverageRGBHalftone: {
    //     inputs: { 
    //         value1: { value: 8, min: 2, max: 40, step: 1 },
    //         label1: { textContent: "Dot Size:" },
    //         value2: {value:1, min:0, max:40, step:1,},
    //         label2: {textContent:"Min Size:"},
    //     },
    //     visible: ["ValueInput","ValueInput2","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"]
    // },

    ComponentQuantize: {
        inputs: {value1: {value:16, min:2, max:64, step:1,},
            label1: {textContent:"Color Steps:"}
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    Trichrome: {
        inputs: {value1: {value:16, min:2, max:64, step:1,},
            label1: {textContent:"Color Steps:"}
        },
        visible: ["ColorInput","ColorInput2","ColorInput3","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    ResizeImage: {
        inputs: {value1: {value:0.5, min:0.1, max:10.0, step:0.1,},
            label1: {textContent:"Resize Factor:"}
        },
        visible: ["ValueInput","ImageDropdownOne"],
    },
    QuantizeGrayscale: {
        inputs: {value1: {value:8, min:2, max:64, step:1,},
            label1: {textContent:"Number of Shades:"}
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    ColorGroup: {
        inputs: {value1: {value:30, min:1, max:100, step:1,},
            label1: {textContent:"Color Distance Threshold:"}
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    
    
    WaterColor: {
        inputs: { 
            value1: { value: 50, min: 1, max: 100, step: 1 },
            label1: { textContent: "Water Strength:" }
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"]
    },

    // TruePalette: {
    //     images : [1,2],
    //     inputs: {value1: {value:8, min:2, max:64, step:1,},
    //         label1: {textContent:"Number of Colors:"}
    //     },
    //     visible: ["ValueInput"],
    // },
    // QuickPalette: {
    //     images : [1,2],
    //     inputs: {value1: {value:8, min:2, max:64, step:1,},
    //         label1: {textContent:"Number of Colors:"}
    //     },
    //     visible: ["ValueInput"],
    // },
    // SmoothPalette: {
    //     images : [1,2],
    //     inputs: {value1: {value:8, min:2, max:64, step:1,},
    //         label1: {textContent:"Number of Colors:"}
    //     },
    //     visible: ["ValueInput"],
    // },
    SobelOutline: {
        inputs: {value1: {value:50, min:1, max:400, step:1,},
            label1: {textContent:"Impact:"}
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    Outline: {
        inputs: {value1: {value:32, min:1, max:255, step:1,},
            label1: {textContent:"Threshold:"}
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    // SmoothOutline: {
    //     images : [1,2],
    //     inputs: {value1: {value:32, min:1, max:255, step:1,},
    //         label1: {textContent:"Impact:"}
    //     },
    //     visible: ["ValueInput"],
    // },
    // ShapeOutline: {
    //     images : [1,2],
    //     inputs: {value1: {value:32, min:1, max:255, step:1,},
    //         label1: {textContent:"Impact:"}
    //     },
    //     visible: ["ValueInput"],
    // },
    HueShift: {
        inputs: {value1: {value:45, min:-360, max:360, step:1},
            label1: {textContent:"Hue Shift (°):"},
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    GradientMap: {
        inputs: {value1: {value:100, min:0, max:200, step:1,},
            label1: {textContent:"Blend Strength:"},
            label3: {textContent:"Dark Color:"},
            label4: {textContent:"Light Color:"},
            value3: {value:"#ffffff"},
            value4: {value:"#000000"},},
        visible: ["ValueInput","ColorInput","ColorInput2","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    Quantize: {
        inputs: {value1: {value:32, min:0, max:256, step:1,},
            label1: {textContent:"Filter's Sensitivity:"},
            value2: {value:0, min:-360, max:360, step:1},
            label2: {textContent:"Hue Shift (°):"},
        },
        visible: ["ValueInput","ValueInput2","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    AutoCenter: {
        inputs: {},
        visible: ["ImageDropdownOne"],
    },
    // PosterEdge: {
    //     images : [1,2],
    //     inputs: {value1: {value:16, min:2, max:64, step:1,},
    //             label1: {textContent:"Color Steps:"},
    //             value2: {value:40, min:1, max:255, step:1,},
    //             label2: {textContent:"Edge Threshold:"}
    //     },
    //     visible: ["ValueInput","ValueInput2"],
    // },
    TemperatureShift: {
        inputs: {value1: {value:50, min:-100, max:100, step:1,},
                label1: {textContent:"Temperature Change:"}
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    VibranceBoost: {
        inputs: {value1: {value:50, min:0, max:200, step:1,},
                label1: {textContent:"Vibrance:"},
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
    AutoContrast: {
        inputs: {value1: {value:5, min:0, max:100, step:1,},
                label1: {textContent:"Percentile:"},
        },
        visible: ["InvertMaskDropdown","ValueInput","ImageDropdownOne","ImageDropdownThree"],
    },
    PaletteCycle: {
        inputs: {value1: {value:1, min:1, max:5, step:1,},
                label1: {textContent:"Cycle Mode (1-5):"}
        },
        visible: ["ValueInput","InvertMaskDropdown","ImageDropdownOne","ImageDropdownThree"],
    },
};
updateUIForMode("RemoveWhite");


function updateUIForMode(mode) {
    // print(mode)
    console.log(mode);
    const cfg = modeConfig[mode];

    // hide everything
    ["ValueInput","ValueInput2","ColorInput","ColorInput2","ColorInput3",
    "ComponentDropdown","ClearWasteDropdown","InvertMaskDropdown",
    "ImageDropdownOne","ImageDropdownTwo","ImageDropdownThree","otherSelectDropdown"]
        .forEach(id => document.getElementById(id).style.display = "none");
    
    // show needed elements
    if (cfg.visible)
        cfg.visible.forEach(id => document.getElementById(id).style.display = "block");

    // configure numeric fields
    if (cfg.inputs?.value1) Object.assign(toleranceInput, cfg.inputs.value1);
    if (cfg.inputs?.value2) Object.assign(toleranceInput2, cfg.inputs.value2);
    if (cfg.inputs?.value3) Object.assign(rgbInput, cfg.inputs.value3);
    if (cfg.inputs?.value4) Object.assign(rgbInput2, cfg.inputs.value4);
    if (cfg.inputs?.value5) Object.assign(rgbInput3, cfg.inputs.value5);

    if (cfg.inputs?.label1) Object.assign(InputLabel, cfg.inputs.label1);
    if (cfg.inputs?.label2) Object.assign(InputLabel2, cfg.inputs.label2);
    if (cfg.inputs?.label3) Object.assign(rgbLabel, cfg.inputs.label3);
    if (cfg.inputs?.label4) Object.assign(rgbLabel2, cfg.inputs.label4);

    if (cfg.inputs?.imLab1) Object.assign(ImageDescOne, cfg.inputs.imLab1);
    if (cfg.inputs?.imLab2) Object.assign(ImageDescTwo, cfg.inputs.imLab2);
    if (cfg.inputs?.imLab3) Object.assign(ImageDescThree, cfg.inputs.imLab3);

    if (cfg.inputs?.wasteLabel) Object.assign(ClearLabel, cfg.inputs.wasteLabel);
    if (cfg.inputs?.otherSelect) Object.assign(SelectLabel, cfg.inputs.otherSelect);


    // if (cfg.inputs?.imDrop1) Object.assign(ImageOne, cfg.inputs.imDrop1);
    // if (cfg.inputs?.imDrop2) Object.assign(ImageTwo, cfg.inputs.imDrop2);
    // if (cfg.inputs?.imDrop3) Object.assign(ImageThree, cfg.inputs.imDrop3);
    if (cfg.inputs?.imDrop1) {
        const data = cfg.inputs.imDrop1;
        const selectEl = ImageOne;
        selectEl.innerHTML = '';
        if (data.options) {
            data.options.forEach(opt => {
                selectEl.add(new Option(opt.text, opt.value));
            });
        } else if (data.Option) {
            selectEl.add(new Option(data.Option.value, data.Option.value));
        }
    }

    if (cfg.inputs?.imDrop2) {
        const data = cfg.inputs.imDrop2;
        const selectEl = ImageTwo;
        selectEl.innerHTML = '';
        if (data.options) {
            data.options.forEach(opt => {
                selectEl.add(new Option(opt.text, opt.value));
            });
        } else if (data.Option) {
            selectEl.add(new Option(data.Option.value, data.Option.value));
        }
    }

    if (cfg.inputs?.imDrop3) {
        const data = cfg.inputs.imDrop3;
        const selectEl = ImageThree;
        selectEl.innerHTML = '';
        if (data.options) {
            data.options.forEach(opt => {
                selectEl.add(new Option(opt.text, opt.value));
            });
        } else if (data.Option) {
            selectEl.add(new Option(data.Option.value, data.Option.value));
        }
    }

    // configure labels
    if (cfg.labels)
        Object.entries(cfg.labels).forEach(([id,text]) =>
            document.getElementById(id).textContent = text);
}


const originalImage = new Image();
const tempImage = new Image();
tempImage.src ="BackgroundCut.png";


document.getElementById('file1').addEventListener('change', function(event) {
    const file = event.target.files[0];
    handleInputFile(file,"canvas1");
});

document.getElementById('file2').addEventListener('change', function(event) {
    const file = event.target.files[0];
    handleInputFile(file,"canvas2");
});

document.getElementById('file3').addEventListener('change', function(event) {
    const file = event.target.files[0];
    handleInputFile(file,"canvas3");
});

document.getElementById('file4').addEventListener('change', function(event) {
    const file = event.target.files[0];
    handleInputFile(file,"canvas4");
});

function handleInputFile(file,canvasString) {
    if (file && (file.type === "image/png"||file.type === "image/jpeg")) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                canvas = document.getElementById(canvasString);
                ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                previewChanged();
            };
            img.src = e.target.result;
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}


// When the download button is clicked, filter based on sensitivity and download.
document.getElementById('downloadButton').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'processed_image.png';
    link.click();
});


function hexToRGB(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [parseInt(m[1],16), parseInt(m[2],16), parseInt(m[3],16)] : [0,0,0];
}


function loopPixels(pixels, callback) {
    for (let i = 0; i < pixels.length; i += 4) {
        callback(i, pixels);
    }
}


const UI = {
    canvas: document.getElementById("canvas"),
    preview: document.getElementById("PreviewCanvas"),
    tolerance: document.getElementById("toleranceInput"),
    tolerance2: document.getElementById("toleranceInput2"),
    // mode: document.getElementById("SelectMode"),
    rgb1: document.getElementById("rgbInput"),
    rgb2: document.getElementById("rgbInput2"),
    rgb3: document.getElementById("rgbInput3"),
    clearWaste: document.getElementById("ClearWaste"),
    invertMask: document.getElementById("InvertMask"),
    otherSelectValue: document.getElementById("otherSelect"),
    image1: document.getElementById("canvas1"),
    image2: document.getElementById("canvas2"),
    image3: document.getElementById("canvas3"),
    image4: document.getElementById("canvas4"),
    imageSelect1: document.getElementById("ImageOne"),
    imageSelect2: document.getElementById("ImageTwo"),
    imageSelect3: document.getElementById("ImageThree"),
};



const filters = {
    RemoveWhite: removeWhiteFilter,
    RemoveBlack: removeBlackFilter,
    RemoveAlpha: removeAlphaFilter,
    GreyScale: greyScaleFilter,
    BlackWhite: blackWhiteFilter,
    Invert: invertFilter,
    ChannelBlend: channelBlendFilter,
    Delta: deltaFilter,
    ChangeExposure: ChangeExposureFilter,
    Mix: mixFilter,
    FilterOutRange: outRangeFilter,
    FilterWithinRange: withinRangeFilter,
    ExtractComponent: extractComponentFilter,
    MatrixDither: matrixDitherFilter,
    Halftone: halftoneFilter,
    // // ColorHalftone: colorHalftoneFilter, //Not working at this time
    // RGBHalftone: rgbHalftoneFilter, //Not working at this time
    // AverageRGBHalftone: averagergbHalftoneFilter, //Not working at this time
    RGBRatio: rgbRatioSquareFilter,
    ComponentQuantize: componentQuantizeFilter,
    Trichrome: trichromeFilter,
    ResizeImage: resizeFilter,
    QuantizeGrayscale: quantizeGrayscaleFilter,
    WaterColor: waterColorFilter,
    // // SmoothPalette: smoothPaletteFilter, //Not working at this time
    SobelOutline: sobelOutlineFilter,
    Outline: outlineFilter,
    // SmoothOutline: smoothOutlineFilter, //Not interested at this time
    // ShapeOutline: smoothShapeOutlineFilter, //Not interested at this time
    HueShift: hueShiftFilter,
    GradientMap: GradientMapFilter,
    Quantize: colorQuantShiftFilter,
    AutoCenter: autoCenterFilter,
    // PosterEdge: posterEdgeFilter, //Not interested at this time
    TemperatureShift: temperatureShiftFilter,
    VibranceBoost: vibranceBoostFilter,
    AutoContrast: autoContrastFilter,
    PaletteCycle: paletteCycleFilter,
};


function previewChanged() {
    const mode = currentMode;

    if (filters[mode]) {
        filters[mode]();
    }
    
}

function removeWhiteFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let sensitivity = 256 - Number(UI.tolerance.value);
    let clearMask = UI.invertMask.value==="False"
    const threshold = sensitivity * 3;

    // Filter
    for (let i = 0; i < imgPixels.length; i += 4) {
        const r = imgPixels[i];
        const g = imgPixels[i + 1];
        const b = imgPixels[i + 2];

        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))) {
            if (r + g + b >= threshold) {
                // Set RGB to 0 (Black)
                imgPixels[i] = 0;
                imgPixels[i + 1] = 0;
                imgPixels[i + 2] = 0;

                // If ClearWaste is True make it transparent
                if (UI.clearWaste.value === "True") {
                    imgPixels[i + 3] = 0;
                }
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
}


function removeBlackFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let sensitivity = Number(UI.tolerance.value);
    let clearMask = UI.invertMask.value==="False"
    const threshold = sensitivity * 3;

    // Filter
    for (let i = 0; i < imgPixels.length; i += 4) {
        const r = imgPixels[i];
        const g = imgPixels[i + 1];
        const b = imgPixels[i + 2];
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))) {
            if (r + g + b < threshold) {
                // Set RGB to 0 (Black)
                imgPixels[i] = 0;
                imgPixels[i + 1] = 0;
                imgPixels[i + 2] = 0;

                // If ClearWaste is True make it transparent
                if (UI.clearWaste.value === "True") {
                    imgPixels[i + 3] = 0;
                }
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function removeAlphaFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let sensitivity = Number(UI.tolerance.value);
    let clearMask = UI.invertMask.value==="False"

    // Filter
    for (let i = 0; i < imgPixels.length; i += 4) {
        const r = imgPixels[i];
        const g = imgPixels[i + 1];
        const b = imgPixels[i + 2];
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))) {
            if (imgPixels[i+3] < sensitivity) {
                // Set RGB to 0 (Black)
                imgPixels[i] = 0;
                imgPixels[i + 1] = 0;
                imgPixels[i + 2] = 0;
                imgPixels[i + 3] = 255;
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function greyScaleFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let accuracy = Number(UI.tolerance.value);
    let clearMask = UI.invertMask.value==="False"

    // Filter
    for (let i = 0; i < imgPixels.length; i += 4) {
        const red = imgPixels[i];
        const green = imgPixels[i + 1];
        const blue = imgPixels[i + 2];
        const average = (red+green+blue)/3.0;
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))) {
            imgPixels[i] =average*(accuracy)/100+red*(100-accuracy)/100.0
            imgPixels[i+1] =average*(accuracy)/100+green*(100-accuracy)/100.0
            imgPixels[i+2] =average*(accuracy)/100+blue*(100-accuracy)/100.0
        }
    }
    ctx.putImageData(imgData, 0, 0);
}


function blackWhiteFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let sensitivity = Number(UI.tolerance.value);
    let clearMask = UI.invertMask.value==="False"

    // Filter
    for (let i = 0; i < imgPixels.length; i += 4) {
        const red = imgPixels[i];
        const green = imgPixels[i + 1];
        const blue = imgPixels[i + 2];
        const combination = red+green+blue

        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))) {
            if(combination>=sensitivity*3) {
                imgPixels[i] =255
                imgPixels[i+1] =255
                imgPixels[i+2] =255
            }
            else {
                imgPixels[i] =0
                imgPixels[i+1] =0
                imgPixels[i+2] =0
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);

}

function invertFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let threshold = Number(UI.tolerance.value);
    let clearMask = UI.invertMask.value==="False"

    // Filter
    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))) {
            let avg = (imgPixels[i] + imgPixels[i+1] + imgPixels[i+2]) / 3;

            if (avg >= threshold) {
                imgPixels[i] = 255 - imgPixels[i];
                imgPixels[i + 1] = 255 - imgPixels[i+1];
                imgPixels[i + 2] = 255 - imgPixels[i+2];
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function ChangeExposureFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    let rate = UI.tolerance.value;

    //Filter
    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))) {
            imgPixels[i] *=rate 
            imgPixels[i+1] *=rate
            imgPixels[i+2] *=rate
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function hueShiftFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    let shift = parseInt(UI.tolerance.value) * Math.PI / 180;

    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))) {
            let r = imgPixels[i]   / 255;
            let g = imgPixels[i+1] / 255;
            let b = imgPixels[i+2] / 255;

            // Convert RGB → HSV
            let max = Math.max(r,g,b), min = Math.min(r,g,b);
            let delta = max - min;

            let h = 0;
            if (delta !== 0) {
                if (max === r) h = ((g - b) / delta) % 6;
                else if (max === g) h = (b - r) / delta + 2;
                else h = (r - g) / delta + 4;
            }
            h = (h * Math.PI/3) + shift;  // rotate hue
            let s = max === 0 ? 0 : delta / max;
            let v = max;

            // Convert HSV → RGB
            let C = v * s;
            let X = C * (1 - Math.abs((h / (Math.PI/3)) % 2 - 1));
            let m = v - C;

            let r1, g1, b1;
            let sector = Math.floor((h / (Math.PI/3))) % 6;

            if (sector === 0) [r1,g1,b1] = [C,X,0];
            if (sector === 1) [r1,g1,b1] = [X,C,0];
            if (sector === 2) [r1,g1,b1] = [0,C,X];
            if (sector === 3) [r1,g1,b1] = [0,X,C];
            if (sector === 4) [r1,g1,b1] = [X,0,C];
            if (sector === 5) [r1,g1,b1] = [C,0,X];

            imgPixels[i]   = (r1 + m) * 255;
            imgPixels[i+1] = (g1 + m) * 255;
            imgPixels[i+2] = (b1 + m) * 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function halftoneFilter() {

    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    let flipGrad = UI.otherSelectValue.value==="True"
    
    const w = UI.canvas.width;
    const h = UI.canvas.height;

    // dot cell size (2–40)
    const cell = parseInt(UI.tolerance.value);

    // clone original for sampling
    const original = new Uint8ClampedArray(imgPixels);

    // loop through each halftone cell
    for (let cy = 0; cy < h; cy += cell) {
        for (let cx = 0; cx < w; cx += cell) {

            // sample brightness from center of the cell
            let sx = Math.min(w - 1, cx + cell / 2);
            let sy = Math.min(h - 1, cy + cell / 2);
            let si = (Math.floor(sy) * w + Math.floor(sx)) * 4;

            if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[si+3]===255 )) || (!clearMask && (maskPixels[si+3]===0 ))) {

                let r = original[si];
                let g = original[si+1];
                let b = original[si+2];
                let brightness = (r + g + b) / 3;  // 0–255

                // dot radius: darker pixel = larger dot
                let radius = ((255 - brightness) / 255) * (cell / 2);

                // draw dot inside cell
                // Inside the cell loop
                let rSq = radius * radius; 

                for (let y = 0; y < cell; y++) {
                    let py = cy + y;
                    if (py >= h) break; // Don't process past bottom

                    for (let x = 0; x < cell; x++) {
                        let px = cx + x;
                        if (px >= w) break; // Don't process past right edge

                        let dx = x - cell / 2;
                        let dy = y - cell / 2;
                        let i = (py * w + px) * 4;


                        if ((((dx * dx + dy * dy) > rSq) && flipGrad)||(((dx * dx + dy * dy) < rSq) && !flipGrad)){
                            imgPixels[i] = imgPixels[i+1] = imgPixels[i+2] = 0; // Black
                        } else {
                            imgPixels[i] = imgPixels[i+1] = imgPixels[i+2] = 255; // White
                        }
                        imgPixels[i+3] = 255; 
                    }
                }
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function vibranceBoostFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    let vib = parseFloat(UI.tolerance.value) / 100;

    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))) {

            let r = imgPixels[i];
            let g = imgPixels[i+1];
            let b = imgPixels[i+2];

            let max = Math.max(r,g,b);
            let min = Math.min(r,g,b);
            let saturation = (max - min) / 255;

            let boost = vib * (1 - saturation); // boost muted, protect saturated

            let gray = (r+g+b) / 3;

            imgPixels[i]   = r + (r - gray) * boost;
            imgPixels[i+1] = g + (g - gray) * boost;
            imgPixels[i+2] = b + (b - gray) * boost;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

// function quantizeFilter(){
//     //Handle the Canvases
//     const sourceCanvas = document.getElementById(UI.imageSelect1.value);

//     let maskPixels
//     if(UI.imageSelect3.value!=="None"){
//         const maskCanvas = document.getElementById(UI.imageSelect3.value);
//         const tempCanvas = document.createElement("canvas");
//         tempCanvas.width = sourceCanvas.width;
//         tempCanvas.height = sourceCanvas.height;
//         const tempCtx = tempCanvas.getContext("2d");
//         tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
//         const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
//         maskPixels = maskData.data;
//     }

//     const outputCanvas = document.getElementById("canvas");
//     outputCanvas.width = sourceCanvas.width;
//     outputCanvas.height = sourceCanvas.height;
//     const ctx = outputCanvas.getContext("2d");
//     ctx.drawImage(sourceCanvas, 0, 0);
//     const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
//     const imgPixels = imgData.data;



//     // Handle the quantitative inputs
//     let clearMask = UI.invertMask.value==="False"
//     let N = parseInt(UI.tolerance.value);
//     if (N < 2) N = 2;

//     // let pixels = imageData.data;

//     // ---- 1. Build a random sample set (~1200 pixels max) ----
//     let samples = [];
//     let sampleCount = 1200;
//     let totalPixels = imgPixels.length / 4;
//     let step = Math.max(1, Math.floor(totalPixels / sampleCount));

//     for (let i = 0; i < imgPixels.length; i += step * 4) {
//         samples.push([imgPixels[i], imgPixels[i+1], imgPixels[i+2]]);
//     }

//     // ---- DISTANCE FUNCTION ----
//     function dist(a, b) {
//         let dr = a[0]-b[0], dg = a[1]-b[1], db = a[2]-b[2];
//         return dr*dr + dg*dg + db*db;
//     }

//     // ---- 2. K-MEANS++ INITIALIZATION (fixes grayscale collapse) ----
//     let palette = [];

//     // pick the first centroid randomly
//     palette.push(samples[Math.floor(Math.random() * samples.length)]);

//     // pick remaining centroids far apart
//     while (palette.length < N) {
//         let best, bestDist = -1;

//         for (let c of samples) {
//             // find distance to nearest existing centroid
//             let minD = Infinity;
//             for (let p of palette) {
//                 let d = dist(c, p);
//                 if (d < minD) minD = d;
//             }

//             // choose the point that maximizes min distance
//             if (minD > bestDist) {
//                 bestDist = minD;
//                 best = c;
//             }
//         }

//         palette.push(best);
//     }

//     // ---- 3. Run 1 K-means iteration (fast but good quality) ----
//     let clusters = Array.from({length: N}, () => []);

//     for (let c of samples) {
//         let best = 0;
//         let bestD = dist(c, palette[0]);

//         for (let i = 1; i < N; i++) {
//             let d = dist(c, palette[i]);
//             if (d < bestD) {
//                 bestD = d;
//                 best = i;
//             }
//         }

//         clusters[best].push(c);
//     }

//     // recompute cluster centers
//     for (let i = 0; i < N; i++) {
//         if (clusters[i].length === 0) continue;

//         let r=0, g=0, b=0;
//         for (let c of clusters[i]) {
//             r+=c[0]; g+=c[1]; b+=c[2];
//         }

//         let m = clusters[i].length;
//         palette[i] = [ Math.round(r/m), Math.round(g/m), Math.round(b/m) ];
//     }

//     // ---- 4. Apply palette to every pixel ----
//     for (let i = 0; i < imgPixels.length; i += 4) {
//         if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){


//             let r = imgPixels[i], g = imgPixels[i+1], b = imgPixels[i+2];

//             let best = 0;
//             let bestD = dist([r,g,b], palette[0]);

//             for (let p = 1; p < N; p++) {
//                 let d = dist([r,g,b], palette[p]);
//                 if (d < bestD) {
//                     bestD = d;
//                     best = p;
//                 }
//             }

//             let c = palette[best];
//             imgPixels[i] = c[0];
//             imgPixels[i+1] = c[1];
//             imgPixels[i+2] = c[2];
//         }
//     }
//     ctx.putImageData(imgData, 0, 0);
// }

function quantizeGrayscaleFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    let numColors = parseInt(UI.tolerance.value);
    if (numColors < 2) numColors = 2;
    let step = 255 / (numColors - 1);  // distance between output colors

    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            // compute brightness
            let r = imgPixels[i];
            let g = imgPixels[i+1];
            let b = imgPixels[i+2];

            let brightness = (r + g + b) / 3;

            // quantize brightness to nearest output level
            let bin = Math.round(brightness / step) * step;

            // clamp
            if (bin < 0) bin = 0;
            if (bin > 255) bin = 255;

            // assign simplified color
            imgPixels[i]   = bin;
            imgPixels[i+1] = bin;
            imgPixels[i+2] = bin;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

// function rgbHalftoneFilter() {
//     //Handle the Canvases
//     const sourceCanvas = document.getElementById(UI.imageSelect1.value);

//     let maskPixels
//     if(UI.imageSelect3.value!=="None"){
//         const maskCanvas = document.getElementById(UI.imageSelect3.value);
//         const tempCanvas = document.createElement("canvas");
//         tempCanvas.width = sourceCanvas.width;
//         tempCanvas.height = sourceCanvas.height;
//         const tempCtx = tempCanvas.getContext("2d");
//         tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
//         const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
//         maskPixels = maskData.data;
//     }

//     const outputCanvas = document.getElementById("canvas");
//     outputCanvas.width = sourceCanvas.width;
//     outputCanvas.height = sourceCanvas.height;
//     const ctx = outputCanvas.getContext("2d");
//     ctx.drawImage(sourceCanvas, 0, 0);
//     const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
//     const imgPixels = imgData.data;


//     const w = UI.canvas.width;
//     const h = UI.canvas.height;

//     const cell = parseInt(UI.tolerance.value);

//     const original = new Uint8ClampedArray(imgPixels);

//     // White background
//     for (let i = 0; i < imgPixels.length; i += 4) {
//         if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
//             imgPixels[i] = imgPixels[i+1] = imgPixels[i+2] = 255;
//             imgPixels[i+3] = 255;
//         }
//     }

//     // simple per‑channel pixel offsets
//     const offR = { x: 0, y: 0 };
//     const offG = { x: 0, y: 0 };
//     const offB = { x: 0, y: 0 };

//     for (let cy = 0; cy < h; cy += cell) {
//         for (let cx = 0; cx < w; cx += cell) {

//             // sample center of cell
//             let sx = Math.min(w - 1, cx + cell / 2);
//             let sy = Math.min(h - 1, cy + cell / 2);
//             let si = (sy * w + sx) * 4;

//             if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[si+3]===255 )) || (!clearMask && (maskPixels[si+3]===0 ))){

//                 let R = original[si]   / 255;
//                 let G = original[si+1] / 255;
//                 let B = original[si+2] / 255;

//                 let radiusR = R * (cell / 2);
//                 let radiusG = G * (cell / 2);
//                 let radiusB = B * (cell / 2);

//                 drawDot(cx, cy, radiusR, [255, 0, 0], offR);
//                 drawDot(cx, cy, radiusG, [0, 255, 0], offG);
//                 drawDot(cx, cy, radiusB, [0, 0, 255], offB);
//             }
//         }
//     }

//     function drawDot(cx, cy, radius, color, offset) {
//         for (let y = 0; y < cell; y++) {
//             for (let x = 0; x < cell; x++) {

//                 // Apply ONLY the channel offset ONCE
//                 let px = cx + x + offset.x;
//                 let py = cy + y + offset.y;

//                 if (px >= w || py >= h) continue;

//                 let dx = x - cell/2;
//                 let dy = y - cell/2;
//                 let dist = Math.sqrt(dx*dx + dy*dy);

//                 if (dist < radius) {
//                     let i = (py*w + px) * 4;
//                     imgPixels[i]   = Math.min(imgPixels[i],   color[0]);
//                     imgPixels[i+1] = Math.min(imgPixels[i+1], color[1]);
//                     imgPixels[i+2] = Math.min(imgPixels[i+2], color[2]);
//                 }
//             }
//         }
//     }
//     ctx.putImageData(imgData, 0, 0);
// }

function deltaFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let threshold = Number(UI.tolerance.value);
    let clearMask = UI.invertMask.value==="False"


    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            const combination = imgPixels[i]+imgPixels[i+1]+imgPixels[i+2]
            if (combination/3 >= threshold) {
                imgPixels[i] =Math.abs(((combination-imgPixels[i])/2)-imgPixels[i])
                imgPixels[i+1] =Math.abs(((combination-imgPixels[i + 1])/2)-imgPixels[i+1])
                imgPixels[i+2] =Math.abs(((combination-imgPixels[i + 2])/2)-imgPixels[i+2])
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);

}

function channelBlendFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let threshold = Number(UI.tolerance.value);
    let clearMask = UI.invertMask.value==="False"


    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            const combination = imgPixels[i]+imgPixels[i+1]+imgPixels[i+2]
            if (combination/3 >= threshold) {
                imgPixels[i] =(combination-imgPixels[i])/2
                imgPixels[i+1] =(combination-imgPixels[i + 1])/2
                imgPixels[i+2] =(combination-imgPixels[i + 2])/2
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);

}

function componentQuantizeFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"



    let steps = parseInt(UI.tolerance.value);
    const factor = 256 / steps;

    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            imgPixels[i]   = Math.floor(imgPixels[i]   / factor) * factor;
            imgPixels[i+1] = Math.floor(imgPixels[i+1] / factor) * factor;
            imgPixels[i+2] = Math.floor(imgPixels[i+2] / factor) * factor;
        }
    }


    ctx.putImageData(imgData, 0, 0);

}


function trichromeFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"

    function hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    function dist(a, b) {
        let dr = a[0]-b[0], dg = a[1]-b[1], db = a[2]-b[2];
        return dr*dr + dg*dg + db*db;
    }



    // let steps = parseInt(UI.tolerance.value);
    let palette = [hexToRgb(UI.rgb1.value),hexToRgb(UI.rgb2.value),hexToRgb(UI.rgb3.value)]

    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){


            let r = imgPixels[i], g = imgPixels[i+1], b = imgPixels[i+2];

            let best = 0;
            let bestD = dist([r,g,b], palette[0]);

            for (let p = 1; p < 3; p++) {
                let d = dist([r,g,b], palette[p]);
                if (d < bestD) {
                    bestD = d;
                    best = p;
                }
            }

            let c = palette[best];
            imgPixels[i] = c[0];
            imgPixels[i+1] = c[1];
            imgPixels[i+2] = c[2];
        }
    }


    ctx.putImageData(imgData, 0, 0);

}

function outlineFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"




    let sensitivity = parseInt(UI.tolerance.value);
    let width = UI.canvas.width;
    let height = UI.canvas.height;

    // copy original pixels (to avoid modifying mid-loop)
    let original = new Uint8ClampedArray(imgPixels);

    function colorDifference(i1, i2) {
        let dr = original[i1]   - original[i2];
        let dg = original[i1+1] - original[i2+1];
        let db = original[i1+2] - original[i2+2];
        return Math.abs(dr) + Math.abs(dg) + Math.abs(db);
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            let idx = (y * width + x) * 4;

            if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[idx+3]===255 )) || (!clearMask && (maskPixels[idx+3]===0 ))){



                let edge = false;

                // compare to right pixel
                if (x < width - 1) {
                    let right = idx + 4;
                    if (colorDifference(idx, right) > sensitivity)
                        edge = true;
                }

                // compare to bottom pixel
                if (!edge && y < height - 1) {
                    let below = idx + width * 4;
                    if (colorDifference(idx, below) > sensitivity)
                        edge = true;
                }

                if (edge) {
                    // Black line
                    imgPixels[idx]   = 0;
                    imgPixels[idx+1] = 0;
                    imgPixels[idx+2] = 0;
                    imgPixels[idx+3] = 255;
                } else {
                    // White background
                    imgPixels[idx]   = 255;
                    imgPixels[idx+1] = 255;
                    imgPixels[idx+2] = 255;
                    imgPixels[idx+3] = 255;
                }
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function resizeFilter() {
    // Handle the source canvas
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    // Scale factor (e.g. 0.5, 2.0, etc.)
    let factor = parseFloat(UI.tolerance.value);
    if (!factor || factor <= 0) factor = 1;

    let ow = sourceCanvas.width;
    let oh = sourceCanvas.height;

    // New dimensions
    let newW = Math.max(1, Math.floor(ow * factor));
    let newH = Math.max(1, Math.floor(oh * factor));

    // Handle the output canvas (same as other filters)
    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = newW;
    outputCanvas.height = newH;

    const ctx = outputCanvas.getContext("2d");
    ctx.clearRect(0, 0, newW, newH);

    ctx.imageSmoothingEnabled = true;

    // Draw scaled image directly
    ctx.drawImage(
        sourceCanvas,
        0, 0, ow, oh,
        0, 0, newW, newH
    );
}

function autoCenterFilter() {
    // Handle the source canvas
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    // Handle the output canvas
    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;

    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);

    const imageData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const pixels = imageData.data;

    let w = outputCanvas.width;
    let h = outputCanvas.height;

    // Copy original pixels
    let original = new Uint8ClampedArray(pixels);

    let minX = w, maxX = -1;
    let minY = h, maxY = -1;

    // --- FIND BOUNDING BOX OF NON-TRANSPARENT PIXELS ---
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let i = (y * w + x) * 4;
            if (original[i + 3] > 0) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    // If no visible pixels, leave image unchanged
    if (maxX < minX || maxY < minY) {
        ctx.putImageData(imageData, 0, 0);
        return;
    }

    let boxWidth = maxX - minX + 1;
    let boxHeight = maxY - minY + 1;

    // --- TARGET CENTER POSITION ---
    let centerX = Math.floor((w - boxWidth) / 2);
    let centerY = Math.floor((h - boxHeight) / 2);

    // Clear output (transparent)
    for (let i = 0; i < pixels.length; i++) {
        pixels[i] = 0;
    }

    // --- COPY CONTENT INTO CENTER ---
    for (let y = 0; y < boxHeight; y++) {
        for (let x = 0; x < boxWidth; x++) {
            let srcX = minX + x;
            let srcY = minY + y;
            let dstX = centerX + x;
            let dstY = centerY + y;

            let srcI = (srcY * w + srcX) * 4;
            let dstI = (dstY * w + dstX) * 4;

            pixels[dstI]     = original[srcI];
            pixels[dstI + 1] = original[srcI + 1];
            pixels[dstI + 2] = original[srcI + 2];
            pixels[dstI + 3] = original[srcI + 3];
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function temperatureShiftFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let extent = parseInt(UI.tolerance.value);
    let clearMask = UI.invertMask.value==="False"
    let warm = extent > 0 ? extent : 0;
    let cool = extent < 0 ? -extent : 0;

    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){

            imgPixels[i]   = Math.min(255, imgPixels[i]   + warm);  // more red
            imgPixels[i+2] = Math.min(255, imgPixels[i+2] + cool);  // more blue
        }
    }


    ctx.putImageData(imgData, 0, 0);
}

function mixFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    var paint = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput").value);

    for (let i = 0; i < imgPixels.length; i += 4) {

        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            imgPixels[i] =(imgPixels[i]+parseInt(paint[1],16))/2
            imgPixels[i+1] =(imgPixels[i+1]+parseInt(paint[2],16))/2
            imgPixels[i+2] =(imgPixels[i+2]+parseInt(paint[3],16))/2
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function GradientMapFilter(){

    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    let strength = parseFloat(UI.tolerance.value) / 100;

    // get selected colors
    let c1 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput").value);
    let c2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput2").value);

    let darkColor  = [ parseInt(c1[1],16), parseInt(c1[2],16), parseInt(c1[3],16) ];
    let lightColor = [ parseInt(c2[1],16), parseInt(c2[2],16), parseInt(c2[3],16) ];

    for (let i = 0; i < imgPixels.length; i += 4) {

        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            // luminance 0–1
            let L = (imgPixels[i] * 0.299 + imgPixels[i+1] * 0.587 + imgPixels[i+2] * 0.114) / 255;

            let targetR = darkColor[0]   * (1-L) + lightColor[0]   * L;
            let targetG = darkColor[1]   * (1-L) + lightColor[1]   * L;
            let targetB = darkColor[2]   * (1-L) + lightColor[2]   * L;

            // blend original → color‑graded
            imgPixels[i]   = imgPixels[i]   * (1-strength) + targetR * strength;
            imgPixels[i+1] = imgPixels[i+1] * (1-strength) + targetG * strength;
            imgPixels[i+2] = imgPixels[i+2] * (1-strength) + targetB * strength;
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

// function averagergbHalftoneFilter() {
//     //Handle the Canvases
//     const sourceCanvas = document.getElementById(UI.imageSelect1.value);

//     let maskPixels
//     if(UI.imageSelect3.value!=="None"){
//         const maskCanvas = document.getElementById(UI.imageSelect3.value);
//         const tempCanvas = document.createElement("canvas");
//         tempCanvas.width = sourceCanvas.width;
//         tempCanvas.height = sourceCanvas.height;
//         const tempCtx = tempCanvas.getContext("2d");
//         tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
//         const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
//         maskPixels = maskData.data;
//     }

//     const outputCanvas = document.getElementById("canvas");
//     outputCanvas.width = sourceCanvas.width;
//     outputCanvas.height = sourceCanvas.height;
//     const ctx = outputCanvas.getContext("2d");
//     ctx.drawImage(sourceCanvas, 0, 0);
//     const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
//     const imgPixels = imgData.data;

//     // Handle the quantitative inputs
//     let clearMask = UI.invertMask.value==="False"


//     const w = UI.canvas.width;
//     const h = UI.canvas.height;

//     const cell = parseInt(UI.tolerance.value);
//     let minimum = parseInt(UI.tolerance2.value);

//     const original = new Uint8ClampedArray(imgPixels);

//     // White background
//     for (let i = 0; i < imgPixels.length; i += 4) {
//         imgPixels[i] = imgPixels[i+1] = imgPixels[i+2] = 255;
//         imgPixels[i+3] = 255;
//     }

//     // simple per‑channel pixel offsets
//     // const offR = { x: 0, y: 0 };
//     // const offG = { x: 0, y: 0 };
//     // const offB = { x: 0, y: 0 };

//     for (let cy = 0; cy < h; cy += cell) {
//         for (let cx = 0; cx < w; cx += cell) {

//             // sample center of cell
//             let sx = Math.min(w - 1, cx + cell / 2);
//             let sy = Math.min(h - 1, cy + cell / 2);
//             let si = (sy * w + sx) * 4;

//             let R = original[si];
//             let G = original[si+1];
//             let B = original[si+2];
//             let radius = Math.max(minimum,((255-R+G+B)/(3*255))*(cell/2));

//             drawDot(cx, cy, radius, [R,G, B], {x:0,y:0});
//         }
//     }

//     function drawDot(cx, cy, radius, color, offset) {
//         for (let y = 0; y < cell; y++) {
//             for (let x = 0; x < cell; x++) {

//                 // Apply ONLY the channel offset ONCE
//                 let px = cx + x + offset.x;
//                 let py = cy + y + offset.y;

//                 if (px >= w || py >= h) continue;

//                 let dx = x - cell/2;
//                 let dy = y - cell/2;
//                 let dist = Math.sqrt(dx*dx + dy*dy);

//                 if (dist < radius) {
//                     let i = (py*w + px) * 4;
//                     imgPixels[i]   = Math.min(imgPixels[i],   color[0]);
//                     imgPixels[i+1] = Math.min(imgPixels[i+1], color[1]);
//                     imgPixels[i+2] = Math.min(imgPixels[i+2], color[2]);
//                 }
//             }
//         }
//     }

//     ctx.putImageData(imgData, 0, 0);
// }


function autoContrastFilter() {
    // 1. Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);
    const outputCanvas = document.getElementById("canvas");
    
    let maskPixels;
    if (UI.imageSelect3.value !== "None") {
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height).data;
    }

    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // 2. Handle Inputs
    let clearMask = UI.invertMask.value === "False";
    // Percentile limit (e.g., 2% clips bottom 2% and top 2%)
    let pLimit = parseFloat(UI.tolerance.value) / 100; 

    // 3. Create Histogram (to find brightness distribution)
    let histogram = new Int32Array(256);
    let validPixelCount = 0;

    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value === "None" || (clearMask && (maskPixels[i+3] === 255)) || (!clearMask && (maskPixels[i+3] === 0))) {
            // Calculate perceived brightness (Luminance)
            let v = Math.round(imgPixels[i] * 0.299 + imgPixels[i+1] * 0.587 + imgPixels[i+2] * 0.114);
            histogram[v]++;
            validPixelCount++;
        }
    }

    if (validPixelCount === 0) return;

    // 4. Find Thresholds based on Percentile
    let lowThresh = 0;
    let highThresh = 255;
    let goal = validPixelCount * pLimit;

    // Find the Low cut-off
    let count = 0;
    for (let i = 0; i < 256; i++) {
        count += histogram[i];
        if (count >= goal) {
            lowThresh = i;
            break;
        }
    }

    // Find the High cut-off
    count = 0;
    for (let i = 255; i >= 0; i--) {
        count += histogram[i];
        if (count >= goal) {
            highThresh = i;
            break;
        }
    }

    let range = highThresh - lowThresh;
    if (range < 1) range = 1; // Prevent division by zero

    // 5. Apply Contrast Stretch
    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value === "None" || (clearMask && (maskPixels[i+3] === 255)) || (!clearMask && (maskPixels[i+3] === 0))) {
            
            // Remap each channel and clamp between 0 and 255
            imgPixels[i]   = Math.min(255, Math.max(0, (imgPixels[i]   - lowThresh) * 255 / range));
            imgPixels[i+1] = Math.min(255, Math.max(0, (imgPixels[i+1] - lowThresh) * 255 / range));
            imgPixels[i+2] = Math.min(255, Math.max(0, (imgPixels[i+2] - lowThresh) * 255 / range));
        }
    }

    ctx.putImageData(imgData, 0, 0);
}


function outRangeFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"


    var paintOne = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput").value);
    var paintTwo = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput2").value);

    const clear = document.getElementById("ClearWaste").value === "True";

    for (let i = 0; i < imgPixels.length; i += 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            const red = imgPixels[i];
            const green = imgPixels[i + 1];
            const blue = imgPixels[i + 2];

            if ((red <= parseInt(paintOne[1],16) && red >= parseInt(paintTwo[1],16)) ||
                (green <= parseInt(paintOne[2],16) && green >= parseInt(paintTwo[2],16)) ||
                (blue <= parseInt(paintOne[3],16) && blue >= parseInt(paintTwo[3],16))) {

                if (clear) {
                    imgPixels[i] = 0;
                    imgPixels[i+1] = 0;
                    imgPixels[i+2] = 0;
                    imgPixels[i+3] = 0; // transparent
                } else {
                    imgPixels[i] = 0;
                    imgPixels[i+1] = 0;
                    imgPixels[i+2] = 0;
                }
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function withinRangeFilter(){

    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    var paintOne = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput").value);
    var paintTwo = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput2").value);

    const clear = document.getElementById("ClearWaste").value === "True";

    for (let i = 0; i < imgPixels.length; i += 4) {

        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            const red = imgPixels[i];
            const green = imgPixels[i + 1];
            const blue = imgPixels[i + 2];

            if ((red > parseInt(paintOne[1],16) || red < parseInt(paintTwo[1],16)) ||
                (green > parseInt(paintOne[2],16) || green < parseInt(paintTwo[2],16)) ||
                (blue > parseInt(paintOne[3],16) || blue < parseInt(paintTwo[3],16))) {

                if (clear) {
                    imgPixels[i] = 0;
                    imgPixels[i+1] = 0;
                    imgPixels[i+2] = 0;
                    imgPixels[i+3] = 0; // transparent
                } else {
                    imgPixels[i] = 0;
                    imgPixels[i+1] = 0;
                    imgPixels[i+2] = 0;
                }
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function matrixDitherFilter() {
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"


    const w = UI.canvas.width;
    const h = UI.canvas.height;

    // pattern size controlled by slider
    let strength = parseInt(UI.tolerance.value);
    let sensitivity = parseFloat(UI.tolerance2.value);
    let scale = Math.max(1, Math.floor(strength / 10)); // 1–10

    // 4×4 Bayer dither matrix (values 0–15)
    const bayer4 = [
        0,  8,  2, 10,
        12,  4, 14,  6,
        3, 11,  1,  9,
        15,  7, 13,  5
    ];

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {

            let i = (y * w + x) * 4;

            if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){

                // brightness 0–255
                let r = imgPixels[i];
                let g = imgPixels[i+1];
                let b = imgPixels[i+2];
                let brightness = (r + g + b) / 3;

                // pick bayer cell based on position
                let bx = Math.floor(x / scale) % 4;
                let by = Math.floor(y / scale) % 4;

                let threshold = bayer4[by * 4 + bx] * (255 / 16);

                // output only black or white
                if (brightness *sensitivity> threshold) {
                    imgPixels[i]   = 255;
                    imgPixels[i+1] = 255;
                    imgPixels[i+2] = 255;
                } else {
                    imgPixels[i]   = 0;
                    imgPixels[i+1] = 0;
                    imgPixels[i+2] = 0;
                }
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function sobelOutlineFilter(){
    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    let sensitivity = parseInt(UI.tolerance.value);

    let w = UI.canvas.width;
    let h = UI.canvas.height;

    // Copy original pixels for reference (to avoid modifying mid-pass)
    let originalData = new Uint8ClampedArray(imgPixels);

    // Sobel kernels
    const gx = [-1,0,1, -2,0,2, -1,0,1];
    const gy = [-1,-2,-1, 0,0,0, 1,2,1];

    function getPixel(x, y, channel) {
        if (x < 0 || y < 0 || x >= w || y >= h) return 0;
        return originalData[(y*w + x)*4 + channel];
    }

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {

            let idx = (y*w + x)*4;

            if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[idx+3]===255 )) || (!clearMask && (maskPixels[idx+3]===0 ))){


                let sx = 0, sy = 0;

                // Apply Sobel convolution for grayscale intensity
                let k = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {

                        let r = getPixel(x+kx, y+ky, 0);
                        let g = getPixel(x+kx, y+ky, 1);
                        let b = getPixel(x+kx, y+ky, 2);

                        let gray = (r+g+b)/3;

                        sx += gray * gx[k];
                        sy += gray * gy[k];
                        k++;
                    }
                }

                // Edge magnitude
                let magnitude = Math.sqrt(sx*sx + sy*sy);

                // Adjust with user sensitivity
                magnitude = Math.min(255, magnitude * (sensitivity / 50));

                // Write white edges on black background
                
                imgPixels[idx]   = magnitude;
                imgPixels[idx+1] = magnitude;
                imgPixels[idx+2] = magnitude;
                imgPixels[idx+3] = 255;   // opaque
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function extractComponentFilter(){

    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    var sensitivity = document.getElementById('toleranceInput').value
    switch(document.getElementById("SelectComponent").value){
        case "Red":
            for (let i = 0; i < imgPixels.length; i += 4) {

                if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
                    if(imgPixels[i]<=sensitivity) {
                        if( UI.clearWaste.value=="True") {
                            imgPixels[i] =0
                            imgPixels[i+1] =0
                            imgPixels[i+2] =0
                            imgPixels[i+3]=0
                        }
                        else {
                            imgPixels[i] =0
                            imgPixels[i+1] =0
                            imgPixels[i+2] =0
                        }
                    }
                    else {
                        imgPixels[i+1] =0
                        imgPixels[i+2] =0
                    }
                }
            }
            break;
        case "Green":
            for (let i = 0; i < imgPixels.length; i += 4) {
                if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
                    if(imgPixels[i+1]<=sensitivity) {
                        if( UI.clearWaste.value=="True") {
                            imgPixels[i] =0
                            imgPixels[i+1] =0
                            imgPixels[i+2] =0
                            imgPixels[i+3]=0
                        }
                        else {
                            imgPixels[i] =0
                            imgPixels[i+1] =0
                            imgPixels[i+2] =0
                        }
                    }
                    else {
                        imgPixels[i] =0
                        imgPixels[i+2] =0
                    }
                }
            }
            break;
        case "Blue":
            for (let i = 0; i < imgPixels.length; i += 4) {
                if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
                    if(imgPixels[i+2]<=sensitivity) {
                        if( UI.clearWaste.value=="True") {
                            imgPixels[i] =0
                            imgPixels[i+1] =0
                            imgPixels[i+2] =0
                            imgPixels[i+3]=0
                        }
                        else {
                            imgPixels[i] =0
                            imgPixels[i+1] =0
                            imgPixels[i+2] =0
                        }
                    }
                    else {
                        imgPixels[i] =0
                        imgPixels[i+1] =0
                    }
                }
            }
            break;
    }

    ctx.putImageData(imgData, 0, 0);
}

function colorQuantShiftFilter(){

    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    let K = parseInt(UI.tolerance.value);
    let rotate = parseInt(UI.tolerance2.value) / 360;

    if (K < 2) K = 2;

    let N = imgPixels.length / 4;

    // ---- collect sample colors for clustering ----
    let samples = [];
    let interval = Math.max(1, Math.floor(N / 2000)); // limit to ~2k points

    for (let i = 0; i < imgPixels.length; i += interval * 4) {
        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            samples.push([imgPixels[i], imgPixels[i+1], imgPixels[i+2]]);
        }
    }

    // --- KMEANS++ initialization (stable clustering) ---
    function dist(a,b){
        let dr=a[0]-b[0], dg=a[1]-b[1], db=a[2]-b[2];
        return dr*dr + dg*dg + db*db;
    }

    let palette = [];
    // palette.push(samples[Math.floor(Math.random()*samples.length)]);
    palette.push(samples[0]); 

    // pick well-separated initial centroids
    while (palette.length < K) {
        let bestPoint, bestDist = -1;
        for (let s of samples) {
            let dmin = Infinity;
            for (let c of palette)
                dmin = Math.min(dmin, dist(s,c));
            if (dmin > bestDist) {
                bestDist = dmin;
                bestPoint = s;
            }
        }
        palette.push(bestPoint);
    }

    // --- one k-means refinement step ----
    let clusters = Array.from({length:K},()=>[]);

    for (let s of samples) {
        let best=0, bestD=dist(s,palette[0]);
        for (let i=1;i<K;i++){
            let d=dist(s,palette[i]);
            if(d<bestD){ bestD=d; best=i; }
        }
        clusters[best].push(s);
    }

    for (let i=0; i<K; i++){
        let c = clusters[i];
        if(c.length === 0) continue;

        let r=0,g=0,b=0;
        for(let x of c){ r+=x[0]; g+=x[1]; b+=x[2]; }
        palette[i] = [ r/c.length, g/c.length, b/c.length ];
    }

    // ---- shift the palette slightly in hue ----
    function rgbToHsv(r,g,b){
        r/=255; g/=255; b/=255;
        let max=Math.max(r,g,b), min=Math.min(r,g,b);
        let v=max, d=max-min;
        let s=max===0?0:d/max;
        let h=0;

        if (d!==0){
            if(max===r) h=(g-b)/d + (g<b?6:0);
            else if(max===g) h=(b-r)/d + 2;
            else h=(r-g)/d + 4;
            h/=6;
        }
        return [h,s,v];
    }

    function hsvToRgb(h,s,v){
        let i=Math.floor(h*6);
        let f=h*6-i;
        let p=v*(1-s), q=v*(1-f*s), t=v*(1-(1-f)*s);
        let r,g,b;

        switch(i%6){
            case 0:r=v; g=t; b=p; break;
            case 1:r=q; g=v; b=p; break;
            case 2:r=p; g=v; b=t; break;
            case 3:r=p; g=q; b=v; break;
            case 4:r=t; g=p; b=v; break;
            case 5:r=v; g=p; b=q; break;
        }
        return [r*255,g*255,b*255];
    }

    // small hue rotation (~20 deg)

    for (let i=0; i<K; i++){
        let [h,s,v] = rgbToHsv(...palette[i]);
        h = (h + rotate) % 1;
        palette[i] = hsvToRgb(h,s,v);
    }

    // ---- apply palette to whole image ----
    for (let i=0;i<imgPixels.length;i+=4){

        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){
            let r=imgPixels[i], g=imgPixels[i+1], b=imgPixels[i+2];
            let best=0, bestD=dist([r,g,b], palette[0]);

            for (let p=1;p<K;p++){
                let d=dist([r,g,b], palette[p]);
                if(d < bestD){ bestD=d; best=p; }
            }

            imgPixels[i]   = palette[best][0];
            imgPixels[i+1] = palette[best][1];
            imgPixels[i+2] = palette[best][2];
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

// function colorGroupFilter() {

//     //Handle the Canvases
//     const sourceCanvas = document.getElementById(UI.imageSelect1.value);

//     let maskPixels
//     if(UI.imageSelect3.value!=="None"){
//         const maskCanvas = document.getElementById(UI.imageSelect3.value);
//         const tempCanvas = document.createElement("canvas");
//         tempCanvas.width = sourceCanvas.width;
//         tempCanvas.height = sourceCanvas.height;
//         const tempCtx = tempCanvas.getContext("2d");
//         tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
//         const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
//         maskPixels = maskData.data;
//     }

//     const outputCanvas = document.getElementById("canvas");
//     outputCanvas.width = sourceCanvas.width;
//     outputCanvas.height = sourceCanvas.height;
//     const ctx = outputCanvas.getContext("2d");
//     ctx.drawImage(sourceCanvas, 0, 0);
//     const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
//     const imgPixels = imgData.data;

//     // Handle the quantitative inputs
//     let clearMask = UI.invertMask.value==="False"


//     const w = UI.canvas.width;
//     const h = UI.canvas.height;
//     const threshold = parseInt(UI.tolerance.value) || 30;

//     const original = new Uint8ClampedArray(imgPixels); // backup
//     const visited = new Uint8Array(w * h);          // 0/1 for region tagging

//     // Helper: color distance
//     function dist(i1, i2) {
//         let dr = original[i1] - original[i2];
//         let dg = original[i1+1] - original[i2+1];
//         let db = original[i1+2] - original[i2+2];
//         return Math.sqrt(dr*dr + dg*dg + db*db);
//     }

//     // Flood fill region growing
//     for (let y = 0; y < h; y++) {
//         for (let x = 0; x < w; x++) {
//             let index = (y * w + x);

//             if (visited[index]) continue; // already processed

//             // Start new region
//             let queue = [index];
//             visited[index] = 1;

//             let sumR = 0, sumG = 0, sumB = 0;
//             let count = 0;

//             const regionPixels = [];

//             while (queue.length > 0) {
//                 let p = queue.pop();
//                 let i = p * 4;

//                 // Add pixel to region stats
//                 sumR += original[i];
//                 sumG += original[i+1];
//                 sumB += original[i+2];
//                 count++;
//                 regionPixels.push(p);

//                 // Explore 4-neighbors
//                 let neighbors = [
//                     p - 1,
//                     p + 1,
//                     p - w,
//                     p + w
//                 ];

//                 for (let n of neighbors) {
//                     if (n < 0 || n >= w * h) continue;
//                     if (visited[n]) continue;

//                     let ni = n * 4;
//                     // Compare color distance to seed pixel
//                     let d = Math.sqrt(
//                         (original[ni]   - original[i])**2 +
//                         (original[ni+1] - original[i+1])**2 +
//                         (original[ni+2] - original[i+2])**2
//                     );

//                     if (d <= threshold) {
//                         visited[n] = 1;
//                         queue.push(n);
//                     }
//                 }
//             }

//             // Compute region average color
//             let r = sumR / count;
//             let g = sumG / count;
//             let b = sumB / count;

//             // Apply average color to all pixels in region
//             for (let p of regionPixels) {
//                 let i = p * 4;
//                 imgPixels[i]   = r;
//                 imgPixels[i+1] = g;
//                 imgPixels[i+2] = b;
//                 // keep alpha same
//             }
//         }
//     }

//     ctx.putImageData(imgData, 0, 0);
// }

// function waterColorFilter() {

//     //Handle the Canvases
//     const sourceCanvas = document.getElementById(UI.imageSelect1.value);

//     let maskPixels
//     if(UI.imageSelect3.value!=="None"){
//         const maskCanvas = document.getElementById(UI.imageSelect3.value);
//         const tempCanvas = document.createElement("canvas");
//         tempCanvas.width = sourceCanvas.width;
//         tempCanvas.height = sourceCanvas.height;
//         const tempCtx = tempCanvas.getContext("2d");
//         tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
//         const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
//         maskPixels = maskData.data;
//     }

//     const outputCanvas = document.getElementById("canvas");
//     outputCanvas.width = sourceCanvas.width;
//     outputCanvas.height = sourceCanvas.height;
//     const ctx = outputCanvas.getContext("2d");
//     ctx.drawImage(sourceCanvas, 0, 0);
//     const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
//     const imgPixels = imgData.data;

//     // Handle the quantitative inputs
//     let clearMask = UI.invertMask.value==="False"

//     const w = UI.canvas.width;
//     const h = UI.canvas.height;
//     const strength = parseInt(UI.tolerance.value) / 100;

//     const original = new Uint8ClampedArray(imgPixels);

//     // --- Step 1: Heavy blur wash (soft watercolor base) ---
//     function boxBlurPass(src, temp) {
//         for (let y = 1; y < h - 1; y++) {
//             for (let x = 1; x < w - 1; x++) {
//                 let i = (y * w + x) * 4;

//                 let t = (i - w*4);
//                 let m = i;
//                 let b = (i + w*4);

//                 temp[i]   = (src[t] + src[m] + src[b]) / 3;
//                 temp[i+1] = (src[t+1] + src[m+1] + src[b+1]) / 3;
//                 temp[i+2] = (src[t+2] + src[m+2] + src[b+2]) / 3;
//                 temp[i+3] = 255;
//             }
//         }
//     }

//     let temp = new Uint8ClampedArray(imgPixels.length);

//     // apply blur multiple times based on strength
//     let passes = Math.floor(3 + strength * 10);
//     for (let p = 0; p < passes; p++) {
//         boxBlurPass(imgPixels, temp);
//         imgPixels.set(temp);
//     }

//     // --- Step 2: Color bleeding (water diffusion) ---
//     for (let y = 1; y < h - 1; y++) {
//         for (let x = 1; x < w - 1; x++) {

//             let i = (y * w + x) * 4;
//             let right = i + 4;
//             let down  = i + w*4;

//             imgPixels[i]   = (imgPixels[i]   * 0.7 + imgPixels[right]   * 0.3);
//             imgPixels[i+1] = (imgPixels[i+1] * 0.7 + imgPixels[right+1] * 0.3);
//             imgPixels[i+2] = (imgPixels[i+2] * 0.7 + imgPixels[right+2] * 0.3);

//             imgPixels[i]   = (imgPixels[i]   * 0.7 + imgPixels[down]    * 0.3);
//             imgPixels[i+1] = (imgPixels[i+1] * 0.7 + imgPixels[down+1]  * 0.3);
//             imgPixels[i+2] = (imgPixels[i+2] * 0.7 + imgPixels[down+2]  * 0.3);
//         }
//     }

//     // --- Step 3: Watercolor tone compression ---
//     // Creates the soft "wash" effect.
//     for (let i = 0; i < imgPixels.length; i += 4) {
//         imgPixels[i]   = Math.sqrt(imgPixels[i]  ) * 16;
//         imgPixels[i+1] = Math.sqrt(imgPixels[i+1]) * 16;
//         imgPixels[i+2] = Math.sqrt(imgPixels[i+2]) * 16;
//     }

//     // --- Step 4: Paper texture overlay (guaranteed visible) ---
//     function noise(x, y) {
//         return (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
//     }

//     for (let y = 0; y < h; y++) {
//         for (let x = 0; x < w; x++) {
//             let n = noise(x, y) * (strength * 30 - 15);
//             let i = (y * w + x) * 4;

//             imgPixels[i]   = Math.min(255, Math.max(0, imgPixels[i]   + n));
//             imgPixels[i+1] = Math.min(255, Math.max(0, imgPixels[i+1] + n));
//             imgPixels[i+2] = Math.min(255, Math.max(0, imgPixels[i+2] + n));
//         }
//     }

//     ctx.putImageData(imgData, 0, 0);
// }

function waterColorFilter() {
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);
    
    // 1. Setup Mask
    let maskPixels;
    if(UI.imageSelect3.value !== "None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height).data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    const w = outputCanvas.width;
    const h = outputCanvas.height;
    const strength = parseInt(UI.tolerance.value) / 100;
    const clearMask = UI.invertMask.value === "False";
    const original = new Uint8ClampedArray(imgPixels);

    if (strength <= 0) return;

    // Helper: Clamps coordinates and checks mask
    function getIdx(x, y) {
        x = Math.max(0, Math.min(w - 1, x));
        y = Math.max(0, Math.min(h - 1, y));
        return (y * w + x) * 4;
    }

    function isPixelMasked(i) {
        if (UI.imageSelect3.value === "None") return false;
        // If clearMask is true, we ONLY process fully opaque pixels (255)
        return clearMask ? (maskPixels[i + 3] !== 255) : (maskPixels[i + 3] === 255);
    }

    // --- Step 1: Mask-Aware Box Blur ---
    function blurPass(src, dest) {
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let i = (y * w + x) * 4;
                
                if (isPixelMasked(i)) {
                    dest[i] = src[i]; dest[i+1] = src[i+1]; dest[i+2] = src[i+2]; dest[i+3] = src[i+3];
                    continue;
                }

                let t = getIdx(x, y - 1), b = getIdx(x, y + 1);
                let l = getIdx(x - 1, y), r = getIdx(x + 1, y);

                for (let c = 0; c < 4; c++) {
                    dest[i+c] = (src[i+c] + src[t+c] + src[b+c] + src[l+c] + src[r+c]) / 5;
                }
            }
        }
    }

    let temp = new Uint8ClampedArray(imgPixels.length);
    let passes = Math.floor(strength * 10);
    for (let p = 0; p < passes; p++) {
        blurPass(imgPixels, temp);
        imgPixels.set(temp);
    }

    // --- Step 2: Mask-Aware Omni-Directional Bleed ---
    let bleed = 0.15 * strength; 
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let i = (y * w + x) * 4;
            
            if (isPixelMasked(i)) continue;

            let t = getIdx(x, y - 1), b = getIdx(x, y + 1);
            let l = getIdx(x - 1, y), r = getIdx(x + 1, y);

            for (let c = 0; c < 4; c++) { 
                let neighbors = (imgPixels[t+c] + imgPixels[b+c] + imgPixels[l+c] + imgPixels[r+c]) / 4;
                imgPixels[i+c] = (imgPixels[i+c] * (1 - bleed) + neighbors * bleed);
            }
        }
    }

    // --- Step 3: Final Tone Wash & Blend ---
    for (let i = 0; i < imgPixels.length; i += 4) {
        if (isPixelMasked(i)) continue;

        let rW = Math.sqrt(imgPixels[i]) * 16;
        let gW = Math.sqrt(imgPixels[i + 1]) * 16;
        let bW = Math.sqrt(imgPixels[i + 2]) * 16;
        let aW = imgPixels[i + 3]; 

        imgPixels[i]     = original[i]   * (1 - strength) + rW * strength;
        imgPixels[i + 1] = original[i + 1] * (1 - strength) + gW * strength;
        imgPixels[i + 2] = original[i + 2] * (1 - strength) + bW * strength;
        imgPixels[i + 3] = original[i + 3] * (1 - strength) + aW * strength;
    }

    ctx.putImageData(imgData, 0, 0);
}



function paletteCycleFilter(){

    //Handle the Canvases
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    const outputCanvas = document.getElementById("canvas");
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const imgPixels = imgData.data;

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"
    let modeN = parseInt(UI.tolerance.value) % 6;

    for (let i = 0; i < imgPixels.length; i += 4) {

        if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[i+3]===255 )) || (!clearMask && (maskPixels[i+3]===0 ))){

            let r = imgPixels[i];
            let g = imgPixels[i+1];
            let b = imgPixels[i+2];

            if (modeN === 1) {
                imgPixels[i]   = g;
                imgPixels[i+1] = b;
                imgPixels[i+2] = r;
            }
            else if (modeN === 2) {
                imgPixels[i]   = g;
                imgPixels[i+1] = r;
                imgPixels[i+2] = b;
            }
            else if (modeN === 3) {
                imgPixels[i]   = b;
                imgPixels[i+1] = r;
                imgPixels[i+2] = g;
            }
            else if (modeN === 4) {
                imgPixels[i]   = b;
                imgPixels[i+1] = g;
                imgPixels[i+2] = r;
            }
            else {
                imgPixels[i]   = r;
                imgPixels[i+1] = b;
                imgPixels[i+2] = g;
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function rgbRatioSquareFilter() {
    const sourceCanvas = document.getElementById(UI.imageSelect1.value);
    const outputCanvas = document.getElementById("canvas");
    
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const ctx = outputCanvas.getContext("2d");
    ctx.drawImage(sourceCanvas, 0, 0);
    
    const imgData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const pixels = imgData.data;
    const w = outputCanvas.width;
    const h = outputCanvas.height;

    let maskPixels
    if(UI.imageSelect3.value!=="None"){
        const maskCanvas = document.getElementById(UI.imageSelect3.value);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = sourceCanvas.width;
        tempCanvas.height = sourceCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(maskCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const maskData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
        maskPixels = maskData.data;
    }

    // Handle the quantitative inputs
    let clearMask = UI.invertMask.value==="False"

    // Use UI.tolerance or a custom input for the side length
    const size = Math.max(1, parseInt(UI.tolerance.value));
    let flipGrad = UI.otherSelectValue.value==="True"

    for (let y = 0; y < h; y += size) {
        for (let x = 0; x < w; x += size) {

            let idx = (y * w + x) * 4;

            if (UI.imageSelect3.value==="None" || (clearMask && (maskPixels[idx+3]===255 )) || (!clearMask && (maskPixels[idx+3]===0 ))){

            
                let sumR = 0, sumG = 0, sumB = 0, count = 0;

                // 1. Calculate the average color for the current square
                for (let sy = 0; sy < size && y + sy < h; sy++) {
                    for (let sx = 0; sx < size && x + sx < w; sx++) {
                        let i = ((y + sy) * w + (x + sx)) * 4;
                        sumR += pixels[i];
                        sumG += pixels[i + 1];
                        sumB += pixels[i + 2];
                        count++;
                    }
                }

                let avgR = sumR / count;
                let avgG = sumG / count;
                let avgB = sumB / count;

                // 2. Calculate the ratio and scale to "pure" RGB
                // Find the highest value to act as the scaling factor
                let maxVal = Math.max(avgR, avgG, avgB);
                
                let finalR = avgR, finalG = avgG, finalB = avgB;
                if (flipGrad && maxVal > 0) {
                    let scale = 255 / maxVal;
                    finalR = avgR * scale;
                    finalG = avgG * scale;
                    finalB = avgB * scale;
                }

                // 3. Set all pixels in the square to this new color
                for (let sy = 0; sy < size && y + sy < h; sy++) {
                    for (let sx = 0; sx < size && x + sx < w; sx++) {
                        let i = ((y + sy) * w + (x + sx)) * 4;
                        pixels[i]     = finalR;
                        pixels[i + 1] = finalG;
                        pixels[i + 2] = finalB;
                    }
                }
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
}
