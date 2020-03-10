import {Component} from '@angular/core';
import {ChecklistService} from '../checklist.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent {

  displayedColumns: string[] = ['icon', 'name'];

  constructor(protected checklistService: ChecklistService) {
  }

  /**
   * Returns a list of requirements the user has met based on the checklist items
   */
  get metRequirements(): string[] {
    const requirements: string[] = [];

    if (this.checklistService.getItem(ChecklistService.AGREEMENT_YES)) {
      requirements.push('Er is een verwerkingsovereenkomst afgesloten met de externe partij');
    }

    if (this.checklistService.hasItems(
      ChecklistService.PROCESSING_ALLOWED_NECESSARY,
      ChecklistService.PROCESSING_ALLOWED_LAW,
      ChecklistService.PROCESSING_ALLOWED_HEALTH,
      ChecklistService.PROCESSING_ALLOWED_GENERAL,
      ChecklistService.PROCESSING_ALLOWED_PERMISSION
    )) {
      requirements.push('U heeft een rechtmatige grondslag voor de verwerking van persoonsgegevens');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_AMBIGUOUS_NO)) {
      requirements.push('De toestemming is ondubbelzinnig gegeven.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_INFORMED_YES)) {
      requirements.push('U heeft de betrokkenne correct geïnformeerd bij het vragen van toestemming.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_SPECIFIC_YES)) {
      requirements.push('De gevraagde toestemming ziet op een speficiek doel.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_FORCED_NO)) {
      requirements.push('De toestemming is niet onder dwang gegeven.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_PARENTS_YES)) {
      requirements.push('De ouders of verzorgers van het kind hebben toestemming gegeven voor de verwerking.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_PROOF_YES)) {
      requirements.push('U kunt aantonen dat u toestemming heeft van de betrokkenne.');
    }

    if (this.checklistService.getItem(ChecklistService.ACCOUNTABILITY_YES)) {
      requirements.push('Er wordt voldaan aan de verantwoordingsplicht.');
    }

    if (this.checklistService.getItem(ChecklistService.DPIA_YES)) {
      requirements.push('Er is een Data Protection Impact Assessment (DPIA) uitgevoerd.');
    }

    if (this.checklistService.getItem(ChecklistService.DATA_PROTECTION_OFFICER_YES)) {
      requirements.push('Er is een functionaris gegevensbescherming aangewezen.');
    }

    if (this.checklistService.getItem(ChecklistService.PRIVACY_BY_DESIGN_YES)) {
      requirements.push('U houdt zich aan het wettelijke vereiste "Privacy by Design".');
    }

    if (this.checklistService.getItem(ChecklistService.PRIVACY_BY_DEFAULT_YES)) {
      requirements.push('U houdt zich aan het wettelijke vereiste "Privacy by Default".');
    }

    if (this.checklistService.getItem(ChecklistService.KNOWLEDGE_DATA_BREACH_YES)) {
      requirements.push('U bent zich ervan bewust hoe u moet handelen ten tijde van een datalek.');
    }

    if (this.checklistService.getItem(ChecklistService.INFORMS_SUBJECT_YES)) {
      requirements.push('U stelt uw klaneten op de hoogte van hun rechten.');
    }

    return requirements;
  }

  /**
   * Returns a list of requirements the user has not met based on the checklist
   */
  get notMetRequirements(): string[] {
    const requirements: string[] = [];

    if (this.checklistService.getItem(ChecklistService.AGREEMENT_NO)) {
      requirements.push('Er is geen verwerkingsovereenkomst afgesloten met de externe partij.');
    }

    if (!this.checklistService.hasItems(
      ChecklistService.PROCESSING_ALLOWED_NECESSARY,
      ChecklistService.PROCESSING_ALLOWED_LAW,
      ChecklistService.PROCESSING_ALLOWED_HEALTH,
      ChecklistService.PROCESSING_ALLOWED_GENERAL,
      ChecklistService.PROCESSING_ALLOWED_PERMISSION
    )) {
      requirements.push('U heeft geen grondslag voor de verwerking van persoonsgegevens.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_AMBIGUOUS_YES)) {
      requirements.push('De toestemming is niet ondubbelzinnig gegeven.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_INFORMED_NO)) {
      requirements.push('U heeft de betrokkenne niet correct geïnformeerd bij het vragen van toestemming.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_SPECIFIC_NO)) {
      requirements.push('De gevraagde toestemming ziet niet op een speficiek doel.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_FORCED_YES)) {
      requirements.push('De toestemming is onder dwang gegeven.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_PARENTS_NO)) {
      requirements.push('De ouders of verzorgers van het kind hebben geen toestemming gegeven voor de verwerking.');
    }

    if (this.checklistService.getItem(ChecklistService.PROCESSING_ALLOWED_PERMISSION_PROOF_NO)) {
      requirements.push('U kunt niet aantonen dat u toestemming heeft van de betrokkenne.');
    }

    if (this.checklistService.getItem(ChecklistService.ACCOUNTABILITY_NO)) {
      requirements.push('Er wordt niet voldaan aan de verantwoordingsplicht.');
    }

    if (this.checklistService.getItem(ChecklistService.DPIA_NO)) {
      requirements.push('Er is geen Data Protection Impact Assessment (DPIA) uitgevoerd.');
    }

    if (this.checklistService.getItem(ChecklistService.DATA_PROTECTION_OFFICER_NO)) {
      requirements.push('Er is geen functionaris gegevensbescherming aangewezen.');
    }

    if (this.checklistService.getItem(ChecklistService.PRIVACY_BY_DESIGN_NO)) {
      requirements.push('U houdt zich niet aan het wettelijke vereiste "Privacy by Design".');
    }

    if (this.checklistService.getItem(ChecklistService.PRIVACY_BY_DEFAULT_NO)) {
      requirements.push('U houdt zich niet aan het wettelijke vereiste "Privacy by Default".');
    }

    if (this.checklistService.getItem(ChecklistService.KNOWLEDGE_DATA_BREACH_NO)) {
      requirements.push('U bent zich er niet van bewust hoe u moet handelen ten tijde van een datalek.');
    }

    return requirements;
  }

  /**
   * Returns a list of suggestions based on the checklist
   */
  get suggestions(): string[] {
    const suggestions: string[] = [];

    if (!this.checklistService.getItem(ChecklistService.INFORMS_SUBJECT_YES)) {
      suggestions.push('Het is verstandig om uw klanten op de hoogte te stellen van hun rechten.');
    }

    return suggestions;
  }
}
