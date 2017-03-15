
export default class WaitForImages {

    static configure({ cN, cB }: { cN: string, cB: Array<() => void> }) {
        let COUNTER = 0,
            TargetElements = Array.from(document.querySelectorAll(cN)),
            totalImages = TargetElements.length;
            TargetElements.forEach(async el => {
                let BackGrounImage = window.getComputedStyle(el).backgroundImage!,
                    URLLink = /http.+\.png|jpg$/i.exec(BackGrounImage)![0],
                    fnCheckComplete = (resolver: (value?: {} | PromiseLike<{}> | undefined) => void) => {
                        return () => resolver(++COUNTER);
                    },
                    img = new Image();
                    img.src = URLLink;
                    let totalCount = await new Promise((resolve, reject) => {
                                        img.onerror = fnCheckComplete(reject);
                                        img.onload = fnCheckComplete(resolve);
                                    });
                    if (totalCount === totalImages) {
                        cB.forEach(fn => fn());
                    }
            });
    }
}
