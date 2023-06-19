import { Injectable } from '@angular/core';

export type PlotlyTheme = 'ggplot2' | 'seaborn' | 'simple_white' | 'plotly' | 'plotly_white' | 'plotly_dark' | 'presentation' | 'xgridoff' | 'ygridoff' | 'gridon' | 'none';

@Injectable({
    providedIn: 'root'
})
export class PlotlyThemeLoaderService {

    public get isLoading() { return this._isLoading; }
    private _isLoading: boolean = false;

    public load(themeName: PlotlyTheme): Promise<any> {
        this._isLoading = true;
        return new Promise(resolve => {
            import(`./themes/${themeName}.json`).then(data => {
                resolve(data);
                this._isLoading = false;
            });
        });
    }
}