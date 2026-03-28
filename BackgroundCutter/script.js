
        
        const modeConfig = {
            RemoveWhite: {
                inputs: {value1: {value:1, min:0, max:256, step:1,},
                        label1: {textContent:"Filter's Sensitivity:"}
                },
                visible: ["ValueInput","ClearWasteDropdown"],
            },
            RemoveBlack: {
                inputs: {value1: {value:1, min:0, max:256, step:1,},
                        label1: {textContent:"Filter's Sensitivity:"}
                },
                visible: ["ValueInput","ClearWasteDropdown"],
            },
            RemoveAlpha: {
                inputs: {value1: {value:1, min:0, max:256, step:1,},
                    label1: {textContent:"Filter's Sensitivity:"}
                },
                visible: ["ValueInput"],
            },
            GreyScale: {
                inputs: {value1: {value:100, min:-100, max:100, step:1},
                    label1: {textContent:"Accuracy:"}
                },
                visible: ["ValueInput"],
            },
            BlackWhite: {
                inputs: {value1: {value:32, min:0, max:256, step:1,},
                        label1: {textContent:"Filter's Sensitivity:"}
                    },
                visible: ["ValueInput"],
            },
            Invert: {
                inputs: {},
                visible: [],
            },
            ChannelBlend: {
                inputs: {},
                visible: [],
            },
            Delta: {
                inputs: {},
                visible: [],
            },
            ChangeExposure: {
                inputs: {value1: {value:1.0, min:0.0, max:5.0, step:0.1,},
                        label1: {textContent:"Exposure Rate:"}
                    },
                visible: ["ValueInput"],
            },
            Mix: {
                inputs: {value3: {value:"#000000"},
                    label3: {textContent:"Color:"}
                },
                visible: ["ColorInput"],
            },
            FilterOutRange: {
                inputs: {value3:{value:"#ffffff"},
                    value4:{value:"#000000"},
                    label3: {textContent:"Max Color:"},
                    label4: {textContent:"Min Color:"}
                },
                visible: ["ColorInput","ColorInput2","ClearWasteDropdown"],
            },
            FilterWithinRange: {
                inputs: {value3:{value:"#ffffff"},
                    value4:{value:"#000000"},
                    label3: {textContent:"Max Color:"},
                    label4: {textContent:"Min Color:"}
                },
                visible: ["ColorInput","ColorInput2","ClearWasteDropdown"],
            },
            ExtractComponent: {
                inputs: {value1: {value:0, min:0, max:255, step:1,},
                    label1: {textContent:"Filter's Sensitivity:"}
                },
                visible: ["ValueInput","ComponentDropdown","ClearWasteDropdown"],
            },
            Simplify: {
                inputs: {value1: {value:16, min:2, max:64, step:1,},
                    label1: {textContent:"Color Steps:"}
                },
                visible: ["ValueInput"],
            },
            ResizeImage: {
                inputs: {value1: {value:0.5, min:0.1, max:10.0, step:0.1,},
                    label1: {textContent:"Resize Factor:"}
                },
                visible: ["ValueInput"],
            },
            SimplifyGreyScale: {
                inputs: {value1: {value:8, min:2, max:64, step:1,},
                    label1: {textContent:"Number of Shades:"}
                },
                visible: ["ValueInput"],
            },
            TruePalette: {
                inputs: {value1: {value:8, min:2, max:64, step:1,},
                    label1: {textContent:"Number of Colors:"}
                },
                visible: ["ValueInput"],
            },
            QuickPalette: {
                inputs: {value1: {value:8, min:2, max:64, step:1,},
                    label1: {textContent:"Number of Colors:"}
                },
                visible: ["ValueInput"],
            },
            SobelOutline: {
                inputs: {value1: {value:50, min:1, max:400, step:1,},
                    label1: {textContent:"Impact:"}
                },
                visible: ["ValueInput"],
            },
            Outline: {
                inputs: {value1: {value:32, min:1, max:255, step:1,},
                    label1: {textContent:"Threshold:"}
                },
                visible: ["ValueInput"],
            },
            HueShift: {
                inputs: {value1: {value:45, min:0, max:360, step:1},
                    label1: {textContent:"Hue Shift (°):"}
                },
                visible: ["ValueInput"],
            },
            DualToneMix: {
                inputs: {value1: {value:100, min:0, max:200, step:1,},
                    label1: {textContent:"Blend Strength:"},
                    label3: {textContent:"Dark Color:"},
                    label4: {textContent:"Light Color:"},
                    value3: {value:"#ffffff"},
                    value4: {value:"#000000"},},
                visible: ["ValueInput","ColorInput","ColorInput2"],
            },
            ColorQuantShift: {
                inputs: {value1: {value:32, min:0, max:256, step:1,},
                    label1: {textContent:"Filter's Sensitivity:"},
                },
                visible: ["ValueInput"],
            },
            AutoCenter: {
                inputs: {},
                visible: [],
            },
            Solarize: {
                inputs: {value1: {value:128, min:0, max:255, step:1,},
                        label1: {textContent:"Threshold:"}
                },
                visible: ["ValueInput"],
            },
            PosterEdge: {
                inputs: {value1: {value:16, min:2, max:64, step:1,},
                        label1: {textContent:"Color Steps:"},
                        value2: {value:40, min:1, max:255, step:1,},
                        label2: {textContent:"Edge Threshold:"}
                },
                visible: ["ValueInput","ValueInput2"],
            },
            TemperatureShift: {
                inputs: {value1: {value:50, min:-100, max:100, step:1,},
                        label1: {textContent:"Temperature Change:"}
                },
                visible: ["ValueInput"],
            },
            VibranceBoost: {
                inputs: {value1: {value:50, min:0, max:200, step:1,},
                        label1: {textContent:"Vibrance:"}
                },
                visible: ["ValueInput"],
            },
            AutoContrast: {
                inputs: {},
                visible: [],
            },
            PaletteCycle: {
                inputs: {value1: {value:1, min:1, max:5, step:1,},
                        label1: {textContent:"Cycle Mode (1-5):"}
                },
                visible: ["ValueInput"],
            },

        };

        function updateUIForMode(mode) {
            const cfg = modeConfig[mode];

            // hide everything
            ["ValueInput","ValueInput2","ColorInput","ColorInput2",
            "ComponentDropdown","ClearWasteDropdown"]
                .forEach(id => document.getElementById(id).style.display = "none");

            // show needed elements
            if (cfg.visible)
                cfg.visible.forEach(id => document.getElementById(id).style.display = "block");

            // configure numeric fields
            if (cfg.inputs?.value1) Object.assign(toleranceInput, cfg.inputs.value1);
            if (cfg.inputs?.value2) Object.assign(toleranceInput2, cfg.inputs.value2);
            if (cfg.inputs?.value3) Object.assign(rgbInput, cfg.inputs.value3);
            if (cfg.inputs?.value4) Object.assign(rgbInput2, cfg.inputs.value4);

            if (cfg.inputs?.label1) Object.assign(InputLabel, cfg.inputs.label1);
            if (cfg.inputs?.label2) Object.assign(InputLabel2, cfg.inputs.label2);
            if (cfg.inputs?.label3) Object.assign(rgbLabel, cfg.inputs.label3);
            if (cfg.inputs?.label4) Object.assign(rgbLabel2, cfg.inputs.label4);

            // configure labels
            if (cfg.labels)
                Object.entries(cfg.labels).forEach(([id,text]) =>
                    document.getElementById(id).textContent = text);
        }


        const originalImage = new Image();
        const tempImage = new Image();
        tempImage.src ="BackgroundCut.png";

        document.getElementById('SelectMode').addEventListener('change', function(event) {
            updateUIForMode(SelectMode.value);
            previewChanged()
        });

        // When a png is uploaded, set the canvas to that data.
        document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file && (file.type === "image/png"||file.type === "image/jpeg")) {
            // if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = new Image();
                    img.onload = function() {
                        let canvas = document.getElementById('PreviewCanvas');
                        let ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        // document.getElementById('downloadButton').style.display = 'block';

                        canvas = document.getElementById('canvas');
                        ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);

                        // const variableInput = document.getElementById('toleranceInput');
                        // const labelInput = document.getElementById('InputLabel');
                        // variableInput.value = 1
                        // variableInput.min = 0
                        // variableInput.max = 256
                        // variableInput.step = 1
                        // labelInput.textContent ="Filter's Sensitivity:"
                        document.getElementById('downloadButton').style.display = 'block';

                        document.getElementById('ModeInput').style.display ='block';
                        // document.getElementById('ValueInput').style.display ='block';
                        // document.getElementById('ValueInput2').style.display ='none';
                        // document.getElementById('ColorInput').style.display ='none';
                        // document.getElementById('ColorInput2').style.display ='none';
                        document.getElementById('SelectMode').value = "RemoveWhite"
                        // document.getElementById('ComponentDropdown').style.display ='none';
                        // document.getElementById('ClearWasteDropdown').style.display ='block';
                        // document.getElementById('PreviewCanvas').style.display ='inline';
                        // document.getElementById('canvas').style.display ='inline';
                        updateUIForMode(SelectMode.value)
                        previewChanged()
                    };
                    img.src = e.target.result;
                    originalImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
            // else {
            //     document.getElementById('downloadButton').style.display = 'none';
            //     document.getElementById('ModeInput').style.display ='none';
            //     document.getElementById('ValueInput').style.display ='none';
            //     document.getElementById('ColorInput').style.display ='none';
            //     document.getElementById('ColorInput2').style.display ='none';
            //     document.getElementById('ComponentDropdown').style.display ='none';
            //     document.getElementById('ClearWasteDropdown').style.display ='none';
            //     document.getElementById('PreviewCanvas').style.display ='none';
            //     document.getElementById('canvas').style.display ='none';
            // }
        });

        // When the download button is clicked, filter based on sensitivity and download.
        document.getElementById('downloadButton').addEventListener('click', function() {
            const canvas = document.getElementById('PreviewCanvas');
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
            mode: document.getElementById("SelectMode"),
            rgb1: document.getElementById("rgbInput"),
            rgb2: document.getElementById("rgbInput2"),
            clearWaste: document.getElementById("ClearWaste"),
            // etc…
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
            Simplify: simplifyFilter,
            ResizeImage: resizeFilter,
            SimplifyGreyScale: simplifyGreyScaleFilter,
            TruePalette: truePaletteFilter,
            QuickPalette: quickPaletteFilter,
            SobelOutline: sobelOutlineFilter,
            Outline: outlineFilter,
            HueShift: hueShiftFilter,
            DualToneMix: dualToneMixFilter,
            ColorQuantShift: colorQuantShiftFilter,
            AutoCenter: autoCenterFilter,
            Solarize: solarizeFilter,
            PosterEdge: posterEdgeFilter,
            TemperatureShift: temperatureShiftFilter,
            VibranceBoost: vibranceBoostFilter,
            AutoContrast: autoContrastFilter,
            PaletteCycle: paletteCycleFilter,
        };

        
        function resetPreview() {
            UI.preview.width = UI.canvas.width;
            UI.preview.height = UI.canvas.height;
            UI.preview.getContext("2d").clearRect(0, 0, (UI.canvas.width), (UI.canvas.height));
            UI.preview.getContext("2d").drawImage(UI.canvas, 0, 0);
            // UI.prevCtx.clearRect(0,0,UI.preview.width,UI.preview.height);
            // UI.prevCtx.drawImage(UI.canvas,0,0);
        }

        
        function previewChanged() {
            resetPreview();  

            const ctx = UI.preview.getContext("2d");
            const imageData = ctx.getImageData(0, 0, UI.preview.width, UI.preview.height);
            const pixels = imageData.data;
            
            const mode = UI.mode.value;

            if (filters[mode]) {
                filters[mode](pixels, UI);
            }

            if(mode !== "ResizeImage")
            {
                ctx.putImageData(imageData, 0, 0);
            }

            
        }

        function removeWhiteFilter(pixels, UI){
            let sensitivity = 256-UI.tolerance.value;
            for (let i = 0; i < pixels.length; i += 4) {
                const red = pixels[i];
                const green = pixels[i + 1];
                const blue = pixels[i + 2];
                // If pixel falls out of tolerance, make it transparent
                if (red+blue+green >= sensitivity*3) {
                    pixels[i] =0
                    pixels[i+1] =0
                    pixels[i+2] =0
                    if( UI.clearWaste.value=="True") {
                        pixels[i+3]=0
                    }
                }
            }
        }

        function removeBlackFilter(pixels, UI){
            let sensitivity = UI.tolerance.value;
            for (let i = 0; i < pixels.length; i += 4) {
                const red = pixels[i];
                const green = pixels[i + 1];
                const blue = pixels[i + 2];
                // If pixel falls out of tolerance, make it transparent
                if (red+blue+green < sensitivity*3) {
                    pixels[i] =0
                    pixels[i+1] =0
                    pixels[i+2] =0
                    if( UI.clearWaste.value=="True") {
                        pixels[i+3]=0
                    }
                }
            }
        }

        function removeAlphaFilter(pixels, UI){
            let sensitivity = UI.tolerance.value;
            for (let i = 0; i < pixels.length; i += 4) {
                if(pixels[i+3]<sensitivity) {
                    pixels[i] =0
                    pixels[i+1] =0
                    pixels[i+2] =0
                    pixels[i+3] =255
                }
            }
        }

        function greyScaleFilter(pixels, UI){
            let accuracy = UI.tolerance.value;
            for (let i = 0; i < pixels.length; i += 4) {
                const red = pixels[i];
                const green = pixels[i + 1];
                const blue = pixels[i + 2];
                const average =(red+green+blue)/3.0
                
                pixels[i] =average*(accuracy)/100+red*(100-accuracy)/100.0
                pixels[i+1] =average*(accuracy)/100+green*(100-accuracy)/100.0
                pixels[i+2] =average*(accuracy)/100+blue*(100-accuracy)/100.0
            }
        }


        function blackWhiteFilter(pixels, UI){
            let sensitivity = UI.tolerance.value;
            for (let i = 0; i < pixels.length; i += 4) {
                const combination = pixels[i]+pixels[i+1]+pixels[i+2]
                if(combination>=sensitivity*3) {
                    pixels[i] =255
                    pixels[i+1] =255
                    pixels[i+2] =255
                }
                else {
                    pixels[i] =0
                    pixels[i+1] =0
                    pixels[i+2] =0
                }
                
            }
        }

        function invertFilter(pixels, UI){
            
            loopPixels(pixels, (i,p)=> {
                p[i] = 255 - p[i];
                p[i+1] = 255 - p[i+1];
                p[i+2] = 255 - p[i+2];
            });

            // for (let i = 0; i < pixels.length; i += 4) {
            //     const red = pixels[i];
            //     const green = pixels[i + 1];
            //     const blue = pixels[i + 2];
            //     pixels[i] =(255-red)
            //     pixels[i+1] =(255-green)
            //     pixels[i+2] =(255-blue)
            // }
        }
        
        function channelBlendFilter(pixels, UI){
            loopPixels(pixels, (i,p)=> {
                const combination = pixels[i]+pixels[i+1]+pixels[i+2]
                pixels[i] =(combination-pixels[i])/2
                pixels[i+1] =(combination-pixels[i + 1])/2
                pixels[i+2] =(combination-pixels[i + 2])/2
            });

            // for (let i = 0; i < pixels.length; i += 4) {
            //     const red = pixels[i];
            //     const green = pixels[i + 1];
            //     const blue = pixels[i + 2];
            //     const combination = pixels[i]+pixels[i+1]+pixels[i+2]
            //     pixels[i] =(combination-red)/2
            //     pixels[i+1] =(combination-green)/2
            //     pixels[i+2] =(combination-blue)/2
            // }
        }
        
        function deltaFilter(pixels, UI){
            loopPixels(pixels, (i,p)=> {
                const combination = pixels[i]+pixels[i+1]+pixels[i+2]
                pixels[i] =Math.abs(((combination-pixels[i])/2)-pixels[i])
                pixels[i+1] =Math.abs(((combination-pixels[i + 1])/2)-pixels[i+1])
                pixels[i+2] =Math.abs(((combination-pixels[i + 2])/2)-pixels[i+2])
            });


            // for (let i = 0; i < pixels.length; i += 4) {
            //     const red = pixels[i];
            //     const green = pixels[i + 1];
            //     const blue = pixels[i + 2];
            //     const combination = pixels[i]+pixels[i+1]+pixels[i+2]
            //     pixels[i] =Math.abs((combination-red)/2-red)
            //     pixels[i+1] =Math.abs((combination-green)/2-green)
            //     pixels[i+2] =Math.abs((combination-blue)/2-blue)
            // }
        }
        
        function ChangeExposureFilter(pixels, UI){
            let rate = UI.tolerance.value;
            loopPixels(pixels, (i,p)=> {
                pixels[i] *=rate 
                pixels[i+1] *=rate
                pixels[i+2] *=rate
            });

            // let rate = UI.tolerance.value;
            // for (let i = 0; i < pixels.length; i += 4) {
            //     pixels[i] *=rate 
            //     pixels[i+1] *=rate
            //     pixels[i+2] *=rate
            // }
        }
        
        function mixFilter(pixels, UI){
            var paint = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput").value);
            for (let i = 0; i < pixels.length; i += 4) {
                pixels[i] =(pixels[i]+parseInt(paint[1],16))/2
                pixels[i+1] =(pixels[i+1]+parseInt(paint[2],16))/2
                pixels[i+2] =(pixels[i+2]+parseInt(paint[3],16))/2
            }
        }
        
        function outRangeFilter(pixels, UI){
            var paintOne = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput").value);
            var paintTwo = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput2").value);

            const clear = document.getElementById("ClearWaste").value === "True";

            for (let i = 0; i < pixels.length; i += 4) {
                const red = pixels[i];
                const green = pixels[i + 1];
                const blue = pixels[i + 2];

                if ((red <= parseInt(paintOne[1],16) && red >= parseInt(paintTwo[1],16)) ||
                    (green <= parseInt(paintOne[2],16) && green >= parseInt(paintTwo[2],16)) ||
                    (blue <= parseInt(paintOne[3],16) && blue >= parseInt(paintTwo[3],16))) {

                    if (clear) {
                        pixels[i] = 0;
                        pixels[i+1] = 0;
                        pixels[i+2] = 0;
                        pixels[i+3] = 0; // transparent
                    } else {
                        pixels[i] = 0;
                        pixels[i+1] = 0;
                        pixels[i+2] = 0;
                    }
                }
            }
        }
        
        function withinRangeFilter(pixels, UI){
            var paintOne = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput").value);
            var paintTwo = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput2").value);

            const clear = document.getElementById("ClearWaste").value === "True";

            for (let i = 0; i < pixels.length; i += 4) {
                const red = pixels[i];
                const green = pixels[i + 1];
                const blue = pixels[i + 2];

                if ((red > parseInt(paintOne[1],16) || red < parseInt(paintTwo[1],16)) ||
                    (green > parseInt(paintOne[2],16) || green < parseInt(paintTwo[2],16)) ||
                    (blue > parseInt(paintOne[3],16) || blue < parseInt(paintTwo[3],16))) {

                    if (clear) {
                        pixels[i] = 0;
                        pixels[i+1] = 0;
                        pixels[i+2] = 0;
                        pixels[i+3] = 0; // transparent
                    } else {
                        pixels[i] = 0;
                        pixels[i+1] = 0;
                        pixels[i+2] = 0;
                    }
                }
            }
        }
        
        function extractComponentFilter(pixels, UI){
            var sensitivity = document.getElementById('toleranceInput').value
            switch(document.getElementById("SelectComponent").value){
                case "Red":
                    for (let i = 0; i < pixels.length; i += 4) {
                        if(pixels[i]<=sensitivity) {
                            if( UI.clearWaste.value=="True") {
                                pixels[i] =0
                                pixels[i+1] =0
                                pixels[i+2] =0
                                pixels[i+3]=0
                            }
                            else {
                                pixels[i] =0
                                pixels[i+1] =0
                                pixels[i+2] =0
                            }
                        }
                        else {
                            pixels[i+1] =0
                            pixels[i+2] =0
                        }
                    }
                    break;
                case "Green":
                    for (let i = 0; i < pixels.length; i += 4) {
                        if(pixels[i+1]<=sensitivity) {
                            if( UI.clearWaste.value=="True") {
                                pixels[i] =0
                                pixels[i+1] =0
                                pixels[i+2] =0
                                pixels[i+3]=0
                            }
                            else {
                                pixels[i] =0
                                pixels[i+1] =0
                                pixels[i+2] =0
                            }
                        }
                        else {
                            pixels[i] =0
                            pixels[i+2] =0
                        }
                    }
                    break;
                case "Blue":
                    for (let i = 0; i < pixels.length; i += 4) {
                        if(pixels[i+2]<=sensitivity) {
                            if( UI.clearWaste.value=="True") {
                                pixels[i] =0
                                pixels[i+1] =0
                                pixels[i+2] =0
                                pixels[i+3]=0
                            }
                            else {
                                pixels[i] =0
                                pixels[i+1] =0
                                pixels[i+2] =0
                            }
                        }
                        else {
                            pixels[i] =0
                            pixels[i+1] =0
                        }
                    }
                    break;
            }
        }
        
        function simplifyFilter(pixels, UI){
            let steps = parseInt(UI.tolerance.value);
            const factor = 256 / steps;

            loopPixels(pixels, (i,p)=> {
                pixels[i]   = Math.floor(pixels[i]   / factor) * factor;
                pixels[i+1] = Math.floor(pixels[i+1] / factor) * factor;
                pixels[i+2] = Math.floor(pixels[i+2] / factor) * factor;
            });

        }
        
        function resizeFilter(pixels, UI){
            let factor = parseFloat(UI.tolerance.value);

            let original = document.getElementById("canvas");
            let ow = original.width;
            let oh = original.height;

            // New scaled size
            let newW = Math.max(1, Math.floor(ow * factor));
            let newH = Math.max(1, Math.floor(oh * factor));

            // --- Create offscreen canvas ---
            let resized = document.createElement("canvas");
            resized.width = newW;
            resized.height = newH;

            let rctx = resized.getContext("2d");
            rctx.imageSmoothingEnabled = true;

            // Scale original -> resized
            rctx.drawImage(original, 0, 0, ow, oh, 0, 0, newW, newH);

            // --- Draw resized image onto PreviewCanvas ---
            let preview = UI.preview;
            let pctx = preview.getContext("2d");

            // Reset PreviewCanvas to original image's size
            preview.width = newW;
            preview.height = newH;

            pctx.clearRect(0, 0, newW, newH);
            pctx.drawImage(resized, 0, 0);

            return; // Completely skip the main pixel loop
        }
        
        function simplifyGreyScaleFilter(pixels, UI){
            let numColors = parseInt(UI.tolerance.value);
            if (numColors < 2) numColors = 2;

            let step = 255 / (numColors - 1);  // distance between output colors
            // let pixels = imageData.data;

            for (let i = 0; i < pixels.length; i += 4) {
                // compute brightness
                let r = pixels[i];
                let g = pixels[i+1];
                let b = pixels[i+2];

                let brightness = (r + g + b) / 3;

                // quantize brightness to nearest output level
                let bin = Math.round(brightness / step) * step;

                // clamp
                if (bin < 0) bin = 0;
                if (bin > 255) bin = 255;

                // assign simplified color
                pixels[i]   = bin;
                pixels[i+1] = bin;
                pixels[i+2] = bin;
            }
        }
        
        function truePaletteFilter(pixels, UI){
            let numColors = parseInt(UI.tolerance.value);
            if (numColors < 2) numColors = 2;

            // Collect RGB pixels
            // let pixels = imageData.data;
            let colors = [];

            for (let i = 0; i < pixels.length; i += 4) {
                colors.push([pixels[i], pixels[i+1], pixels[i+2]]);
            }

            // ----- MEDIAN CUT ALGORITHM -----
            function medianCut(bucket, depth) {
                if (bucket.length === 0) return [];

                // stop condition
                if (depth === 0 || bucket.length <= 1) {
                    // average color of bucket
                    let r=0,g=0,b=0;
                    for (let c of bucket) { r+=c[0]; g+=c[1]; b+=c[2]; }
                    r = Math.round(r/bucket.length);
                    g = Math.round(g/bucket.length);
                    b = Math.round(b/bucket.length);
                    return [[r,g,b]];
                }

                // find channel with largest range
                let minR=999, maxR=0, minG=999, maxG=0, minB=999, maxB=0;
                for (let c of bucket) {
                    let [r,g,b] = c;
                    if (r < minR) minR = r; if (r > maxR) maxR = r;
                    if (g < minG) minG = g; if (g > maxG) maxG = g;
                    if (b < minB) minB = b; if (b > maxB) maxB = b;
                }

                let rangeR = maxR - minR;
                let rangeG = maxG - minG;
                let rangeB = maxB - minB;

                // choose split channel
                let channel = rangeR >= rangeG && rangeR >= rangeB ? 0 :
                            rangeG >= rangeR && rangeG >= rangeB ? 1 : 2;

                // sort bucket by chosen channel
                bucket.sort((a,b) => a[channel] - b[channel]);

                // split in middle
                let mid = Math.floor(bucket.length / 2);
                let left = bucket.slice(0, mid);
                let right = bucket.slice(mid);

                // recurse
                return [
                    ...medianCut(left, depth - 1),
                    ...medianCut(right, depth - 1)
                ];
            }

            // depth needed to get numColors boxes
            let depth = Math.ceil(Math.log2(numColors));

            let palette = medianCut(colors, depth);

            // ensure exact N colors
            palette = palette.slice(0, numColors);

            // ----- ASSIGN NEAREST PALETTE COLOR -----
            function dist(a,b) {
                let dr=a[0]-b[0], dg=a[1]-b[1], db=a[2]-b[2];
                return dr*dr + dg*dg + db*db;
            }

            for (let i = 0; i < pixels.length; i += 4) {
                let best = 0;
                let bestD = Infinity;
                let r = pixels[i], g = pixels[i+1], b = pixels[i+2];

                for (let p = 0; p < palette.length; p++) {
                    let d = dist([r,g,b], palette[p]);
                    if (d < bestD) { bestD = d; best = p; }
                }

                pixels[i]   = palette[best][0];
                pixels[i+1] = palette[best][1];
                pixels[i+2] = palette[best][2];
            }
        }
        
        function quickPaletteFilter(pixels, UI){
            let N = parseInt(UI.tolerance.value);
            if (N < 2) N = 2;

            // let pixels = imageData.data;

            // ---- 1. Build a random sample set (~1200 pixels max) ----
            let samples = [];
            let sampleCount = 1200;
            let totalPixels = pixels.length / 4;
            let step = Math.max(1, Math.floor(totalPixels / sampleCount));

            for (let i = 0; i < pixels.length; i += step * 4) {
                samples.push([pixels[i], pixels[i+1], pixels[i+2]]);
            }

            // ---- DISTANCE FUNCTION ----
            function dist(a, b) {
                let dr = a[0]-b[0], dg = a[1]-b[1], db = a[2]-b[2];
                return dr*dr + dg*dg + db*db;
            }

            // ---- 2. K-MEANS++ INITIALIZATION (fixes grayscale collapse) ----
            let palette = [];

            // pick the first centroid randomly
            palette.push(samples[Math.floor(Math.random() * samples.length)]);

            // pick remaining centroids far apart
            while (palette.length < N) {
                let best, bestDist = -1;

                for (let c of samples) {
                    // find distance to nearest existing centroid
                    let minD = Infinity;
                    for (let p of palette) {
                        let d = dist(c, p);
                        if (d < minD) minD = d;
                    }

                    // choose the point that maximizes min distance
                    if (minD > bestDist) {
                        bestDist = minD;
                        best = c;
                    }
                }

                palette.push(best);
            }

            // ---- 3. Run 1 K-means iteration (fast but good quality) ----
            let clusters = Array.from({length: N}, () => []);

            for (let c of samples) {
                let best = 0;
                let bestD = dist(c, palette[0]);

                for (let i = 1; i < N; i++) {
                    let d = dist(c, palette[i]);
                    if (d < bestD) {
                        bestD = d;
                        best = i;
                    }
                }

                clusters[best].push(c);
            }

            // recompute cluster centers
            for (let i = 0; i < N; i++) {
                if (clusters[i].length === 0) continue;

                let r=0, g=0, b=0;
                for (let c of clusters[i]) {
                    r+=c[0]; g+=c[1]; b+=c[2];
                }

                let m = clusters[i].length;
                palette[i] = [ Math.round(r/m), Math.round(g/m), Math.round(b/m) ];
            }

            // ---- 4. Apply palette to every pixel ----
            for (let i = 0; i < pixels.length; i += 4) {
                let r = pixels[i], g = pixels[i+1], b = pixels[i+2];

                let best = 0;
                let bestD = dist([r,g,b], palette[0]);

                for (let p = 1; p < N; p++) {
                    let d = dist([r,g,b], palette[p]);
                    if (d < bestD) {
                        bestD = d;
                        best = p;
                    }
                }

                let c = palette[best];
                pixels[i] = c[0];
                pixels[i+1] = c[1];
                pixels[i+2] = c[2];
            }
        }
        
        function sobelOutlineFilter(pixels, UI){
            let sensitivity = parseInt(UI.tolerance.value);

            let w = UI.canvas.width;
            let h = UI.canvas.height;

            // Copy original pixels for reference (to avoid modifying mid-pass)
            let originalData = new Uint8ClampedArray(pixels);

            // Sobel kernels
            const gx = [-1,0,1, -2,0,2, -1,0,1];
            const gy = [-1,-2,-1, 0,0,0, 1,2,1];

            function getPixel(x, y, channel) {
                if (x < 0 || y < 0 || x >= w || y >= h) return 0;
                return originalData[(y*w + x)*4 + channel];
            }

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {

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
                    let idx = (y*w + x)*4;
                    pixels[idx]   = magnitude;
                    pixels[idx+1] = magnitude;
                    pixels[idx+2] = magnitude;
                    pixels[idx+3] = 255;   // opaque
                }
            }
        }
        
        function outlineFilter(pixels, UI){
            let sensitivity = parseInt(UI.tolerance.value);
            let width = UI.canvas.width;
            let height = UI.canvas.height;

            // copy original pixels (to avoid modifying mid-loop)
            let original = new Uint8ClampedArray(pixels);

            function colorDifference(i1, i2) {
                let dr = original[i1]   - original[i2];
                let dg = original[i1+1] - original[i2+1];
                let db = original[i1+2] - original[i2+2];
                return Math.abs(dr) + Math.abs(dg) + Math.abs(db);
            }

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {

                    let idx = (y * width + x) * 4;
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
                        pixels[idx]   = 0;
                        pixels[idx+1] = 0;
                        pixels[idx+2] = 0;
                        pixels[idx+3] = 255;
                    } else {
                        // White background
                        pixels[idx]   = 255;
                        pixels[idx+1] = 255;
                        pixels[idx+2] = 255;
                        pixels[idx+3] = 255;
                    }
                }
            }
        }
        
        function hueShiftFilter(pixels, UI){
            let shift = parseInt(UI.tolerance.value) * Math.PI / 180;

            for (let i = 0; i < pixels.length; i += 4) {

                let r = pixels[i]   / 255;
                let g = pixels[i+1] / 255;
                let b = pixels[i+2] / 255;

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

                pixels[i]   = (r1 + m) * 255;
                pixels[i+1] = (g1 + m) * 255;
                pixels[i+2] = (b1 + m) * 255;
            }
        }
        
        function dualToneMixFilter(pixels, UI){
            let strength = parseFloat(UI.tolerance.value) / 100;

            // get selected colors
            let c1 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput").value);
            let c2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById("rgbInput2").value);

            let darkColor  = [ parseInt(c1[1],16), parseInt(c1[2],16), parseInt(c1[3],16) ];
            let lightColor = [ parseInt(c2[1],16), parseInt(c2[2],16), parseInt(c2[3],16) ];

            for (let i = 0; i < pixels.length; i += 4) {

                // luminance 0–1
                let L = (pixels[i] * 0.299 + pixels[i+1] * 0.587 + pixels[i+2] * 0.114) / 255;

                let targetR = darkColor[0]   * (1-L) + lightColor[0]   * L;
                let targetG = darkColor[1]   * (1-L) + lightColor[1]   * L;
                let targetB = darkColor[2]   * (1-L) + lightColor[2]   * L;

                // blend original → color‑graded
                pixels[i]   = pixels[i]   * (1-strength) + targetR * strength;
                pixels[i+1] = pixels[i+1] * (1-strength) + targetG * strength;
                pixels[i+2] = pixels[i+2] * (1-strength) + targetB * strength;
            }
        }
        
        function colorQuantShiftFilter(pixels, UI){
            let K = parseInt(UI.tolerance.value);
            if (K < 2) K = 2;

            let N = pixels.length / 4;

            // ---- collect sample colors for clustering ----
            let samples = [];
            let interval = Math.max(1, Math.floor(N / 2000)); // limit to ~2k points

            for (let i = 0; i < pixels.length; i += interval * 4) {
                samples.push([pixels[i], pixels[i+1], pixels[i+2]]);
            }

            // --- KMEANS++ initialization (stable clustering) ---
            function dist(a,b){
                let dr=a[0]-b[0], dg=a[1]-b[1], db=a[2]-b[2];
                return dr*dr + dg*dg + db*db;
            }

            let palette = [];
            palette.push(samples[Math.floor(Math.random()*samples.length)]);

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
            let rotate = 20 / 360;

            for (let i=0; i<K; i++){
                let [h,s,v] = rgbToHsv(...palette[i]);
                h = (h + rotate) % 1;
                palette[i] = hsvToRgb(h,s,v);
            }

            // ---- apply palette to whole image ----
            for (let i=0;i<pixels.length;i+=4){
                let r=pixels[i], g=pixels[i+1], b=pixels[i+2];
                let best=0, bestD=dist([r,g,b], palette[0]);

                for (let p=1;p<K;p++){
                    let d=dist([r,g,b], palette[p]);
                    if(d < bestD){ bestD=d; best=p; }
                }

                pixels[i]   = palette[best][0];
                pixels[i+1] = palette[best][1];
                pixels[i+2] = palette[best][2];
            }
        }
        
        function autoCenterFilter(pixels, UI){
            let w = UI.canvas.width;
            let h = UI.canvas.height;

            let original = new Uint8ClampedArray(pixels);

            let minX = w, maxX = 0;
            let minY = h, maxY = 0;

            // --- FIND BOUNDING BOX ---
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {

                    let i = (y * w + x) * 4;
                    let alpha = original[i+3];

                    if (alpha > 0) {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            // If no visible pixels, nothing to center
            if (minX > maxX || minY > maxY) {
                ctx.putImageData(imageData, 0, 0);
                return;
            }

            let boxWidth = maxX - minX + 1;
            let boxHeight = maxY - minY + 1;

            // --- CALCULATE NEW CENTER POSITION ---
            let centerX = Math.floor((w - boxWidth) / 2);
            let centerY = Math.floor((h - boxHeight) / 2);

            // Clear output
            for (let i = 0; i < pixels.length; i++) pixels[i] = 0; // transparent

            // --- COPY CONTENT INTO CENTER ---
            for (let y = 0; y < boxHeight; y++) {
                for (let x = 0; x < boxWidth; x++) {

                    let srcX = minX + x;
                    let srcY = minY + y;

                    let dstX = centerX + x;
                    let dstY = centerY + y;

                    let srcI = (srcY * w + srcX) * 4;
                    let dstI = (dstY * w + dstX) * 4;

                    pixels[dstI]   = original[srcI];
                    pixels[dstI+1] = original[srcI+1];
                    pixels[dstI+2] = original[srcI+2];
                    pixels[dstI+3] = original[srcI+3];
                }
            }
        }
        
        function solarizeFilter(pixels, UI){
            let threshold = parseInt(UI.tolerance.value);

            for (let i = 0; i < pixels.length; i += 4) {
                let avg = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;

                if (avg > threshold) {
                    pixels[i]   = 255 - pixels[i];
                    pixels[i+1] = 255 - pixels[i+1];
                    pixels[i+2] = 255 - pixels[i+2];
                }
            }
        }
        
        function posterEdgeFilter(pixels, UI){
            // Get settings
            let steps = parseInt(UI.tolerance.value);
            let edgeSensitivity = parseInt(document.getElementById("toleranceInput2").value);

            let factor = 256 / steps;
            let w = UI.canvas.width;
            let h = UI.canvas.height;

            // Copy original
            let original = new Uint8ClampedArray(pixels);

            // Posterize first
            for (let i = 0; i < pixels.length; i += 4) {
                pixels[i]   = Math.floor(original[i]   / factor) * factor;
                pixels[i+1] = Math.floor(original[i+1] / factor) * factor;
                pixels[i+2] = Math.floor(original[i+2] / factor) * factor;
            }

            // Edge detection using 8 neighbors + luminance + color diff
            function luminance(r,g,b) { return r*0.299 + g*0.587 + b*0.114; }

            function pixelDiff(i1, i2) {
                let dr = original[i1]   - original[i2];
                let dg = original[i1+1] - original[i2+1];
                let db = original[i1+2] - original[i2+2];

                let lum1 = luminance(original[i1],   original[i1+1], original[i1+2]);
                let lum2 = luminance(original[i2],   original[i2+1], original[i2+2]);

                let colorDiff = Math.abs(dr) + Math.abs(dg) + Math.abs(db);
                let lumDiff   = Math.abs(lum1 - lum2);

                return colorDiff * 0.6 + lumDiff * 0.4; // weighted
            }

            // Apply edges over posterized output
            for (let y = 1; y < h-1; y++) {
                for (let x = 1; x < w-1; x++) {

                    let i = (y*w + x)*4;
                    let isEdge = false;

                    // Check 8 neighbors
                    let neighbors = [
                        i - 4,                // left
                        i + 4,                // right
                        i - w*4,              // up
                        i + w*4,              // down
                        i - w*4 - 4,          // up-left
                        i - w*4 + 4,          // up-right
                        i + w*4 - 4,          // down-left
                        i + w*4 + 4           // down-right
                    ];

                    for (let n of neighbors) {
                        if (pixelDiff(i, n) > edgeSensitivity) {
                            isEdge = true;
                            break;
                        }
                    }

                    if (isEdge) {
                        pixels[i]   = 0;
                        pixels[i+1] = 0;
                        pixels[i+2] = 0;
                    }
                }
            }
        }
        
        function temperatureShiftFilter(pixels, UI){
            let temp = parseInt(UI.tolerance.value);
            let warm = temp > 0 ? temp : 0;
            let cool = temp < 0 ? -temp : 0;

            for (let i = 0; i < pixels.length; i += 4) {

                pixels[i]   = Math.min(255, pixels[i]   + warm);  // more red
                pixels[i+2] = Math.min(255, pixels[i+2] + cool);  // more blue
            }
        }
        
        function vibranceBoostFilter(pixels, UI){
            let vib = parseFloat(UI.tolerance.value) / 100;

            for (let i = 0; i < pixels.length; i += 4) {

                let r = pixels[i];
                let g = pixels[i+1];
                let b = pixels[i+2];

                let max = Math.max(r,g,b);
                let min = Math.min(r,g,b);
                let saturation = (max - min) / 255;

                let boost = vib * (1 - saturation); // boost muted, protect saturated

                let gray = (r+g+b) / 3;

                pixels[i]   = r + (r - gray) * boost;
                pixels[i+1] = g + (g - gray) * boost;
                pixels[i+2] = b + (b - gray) * boost;
            }
        }
        
        function autoContrastFilter(pixels, UI){
            let minVal = 255;
            let maxVal = 0;

            // find brightness range
            for (let i = 0; i < pixels.length; i += 4) {
                let v = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
                if (v < minVal) minVal = v;
                if (v > maxVal) maxVal = v;
            }

            let range = maxVal - minVal || 1;

            // remap
            for (let i = 0; i < pixels.length; i += 4) {
                pixels[i]   = (pixels[i]   - minVal) * 255 / range;
                pixels[i+1] = (pixels[i+1] - minVal) * 255 / range;
                pixels[i+2] = (pixels[i+2] - minVal) * 255 / range;
            }
        }
        
        function paletteCycleFilter(pixels, UI){
            let modeN = parseInt(UI.tolerance.value);

            for (let i = 0; i < pixels.length; i += 4) {

                let r = pixels[i];
                let g = pixels[i+1];
                let b = pixels[i+2];

                if (modeN === 1) {
                    pixels[i]   = g;
                    pixels[i+1] = b;
                    pixels[i+2] = r;
                }
                else if (modeN === 2) {
                    pixels[i]   = g;
                    pixels[i+1] = r;
                    pixels[i+2] = b;
                }
                else if (modeN === 3) {
                    pixels[i]   = b;
                    pixels[i+1] = r;
                    pixels[i+2] = g;
                }
                else if (modeN === 4) {
                    pixels[i]   = b;
                    pixels[i+1] = g;
                    pixels[i+2] = r;
                }
                else {
                    pixels[i]   = r;
                    pixels[i+1] = b;
                    pixels[i+2] = g;
                }
            }
        }
        