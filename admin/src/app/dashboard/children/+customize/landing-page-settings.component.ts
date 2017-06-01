import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IMenuSubTab, IMenuTab } from 'app/Interfaces';

@Component({
  selector: 'app-landing-page-settings',
  templateUrl: 'landing-page-settings.component.html',
  styleUrls: ['landing-page-settings.component.css']

})
export class LandingPageSettingsComponent {
  private _selectedSectionTab: IMenuSubTab;
  private _sectionList: Array<IMenuSubTab>;

  @Input() set sectionTab(tab: IMenuSubTab) {
    this._selectedSectionTab = tab;
  }
  @Input() set sectionList(list: Array<IMenuSubTab>) {
    this._sectionList = list;
  }
  @Output() onSelected = new EventEmitter(true);
  get sectionTab() {
    return this._selectedSectionTab;
  }
  get sectionList() {
    return this._sectionList;
  }
  onSectionSelect(section: IMenuSubTab) {
    this.onSelected.emit(this.sectionTab = section);
  }
}
