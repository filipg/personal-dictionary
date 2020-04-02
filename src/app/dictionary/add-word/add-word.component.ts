import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Word } from 'src/app/interfaces/word.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      'wordInEnglish': ['', Validators.required],
      'translation': ['', Validators.required]
    });
  }

  onSubmit() {
    const translations: string[] = this.form.value.translation.split(/,|;| /);
    const wordToPost: Word = {wordInEnglish: this.form.value.wordInEnglish, translation: translations};
    this.dataService.saveWord(wordToPost).subscribe(data => console.log(data));
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setErrors(null);
    });
  }

}
