import { DATA_INFO } from "/src/data/scene_data.js";

class PantallaAnimation {
    constructor(scene) {
        this.animation = {};

        this.DURATION = "duration";

        this.data_json = scene.scene.get(DATA_INFO).get_data_json().Json;
        this.animation_data = scene.scene.get(DATA_INFO).get_json(this.data_json.PantallaAnimation);
    }

    set_animation(data) {
        let animation = {};
        Object.entries(data).forEach(([key, value]) => {
            animation[key + "_start"] = value;
            animation[key + "_end"] = value;
        });
        return animation;
    }

    get_animation_data(animation, data) {
        let data_assistant = {};

        Object.entries(data).forEach(([key, value]) => {
            data_assistant[key] = value;
        });
        
        Object.entries(animation).forEach(([key, value]) => {
            this.animation[key] = [];

            Object.entries(data_assistant).forEach(([data_assistant_key, data_assistant_value]) => {
                data[data_assistant_key] = data_assistant[data_assistant_key];
            });

            value.forEach((val) => {
                let val_set_data = this.set_animation(data);
                this.animation[key].push(val_set_data);
                let index = this.animation[key].length - 1;
                this.get_animation(data_assistant, animation, key, index);
            });
        });
        // this.animation[this.DURATION] = animation[this.DURATION];

        // let animation_type = this.animation_data[animation.type];

        // Object.entries(animation_type).forEach(([key, value]) => {
        //     this.animation[key] = value;
        // });

        return this.animation;
    }

    get_animation(data_assistant, animation, key, index) {
        let animation_type = this.animation_data[animation[key][index].type];
        this.animation[key][index][this.DURATION] = animation[key][index][this.DURATION];
        Object.entries(animation_type).forEach(([key_animation, value_animation]) => {
            let value = this.translate_animation(value_animation, key, index)
            this.animation[key][index][key_animation] = value;
            if (key_animation.endsWith('_end')) {
                data_assistant[key_animation.slice(0, -4)] = value;
            }
        });
    }

    translate_animation(value, key, index) {
        if (typeof value !== 'string') return value;
    
        const info = [];
        let buffer = '';
        let inBraces = false;
        let braceContent = '';
        let i = 0;
        let operation = '';
    
        while (i < value.length) {
            const char = value[i];
    
            // Si es un número (dígito) y no estamos leyendo otra cosa
            if (!inBraces && /\d/.test(char)) {
                let numStr = char;
                i++;              
                while (i < value.length && /\d/.test(value[i])) {
                    numStr += value[i];
                    i++;
                }
                info.push(parseInt(numStr));
                continue;
            }
    
            // Si encontramos {
            if (char === '{') {
                inBraces = true;
                braceContent = '';
                i++;
                continue;
            }
    
            if (char === '}' && inBraces) {
                inBraces = false;
                operation = braceContent;
                i++;
                continue;
            }
    
            if (inBraces) {
                braceContent += char;
                i++;
                continue;
            }
    
            // Si encontramos $
            if (char === '$') {
                let varName = '';
                i++;
                while (i < value.length && !/\s/.test(value[i])) {
                    varName += value[i];
                    i++;
                }
                info.push({ variable: varName });
                continue;
            }
    
            // Si es cualquier otra letra o espacio
            buffer += char;
            i++;
        }
    
        // Agregar el texto plano restante si existe
        if (buffer.trim()) {
            info.push(buffer.trim());
        }

        let operations = [];
        info.forEach((item, index) => {
            if (Number.isInteger(item)) {
                operations.push(item);
            } else if (item.variable) {
                operations.push(this.animation[key][index][item.variable]);
            }
        });

        console.log(operations);

    
        return this.operation_animation(operations[0], operations[1], operation);
    }
    

    operation_animation(value1, value2, operation) {
        switch (operation) {
            case "add":
                return value1 + value2;
            case "sub":
                return value1 - value2;
            case "mul":
                return value1 * value2;
            case "div":
                return value1 / value2;
            default:
                console.log("No se ha encontrado la operacion: " + operation);
                break;
        }
    }

}

export default PantallaAnimation;