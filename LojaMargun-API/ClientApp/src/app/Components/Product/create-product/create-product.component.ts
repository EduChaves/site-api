import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { Item } from 'src/app/Models/Item';
import { CategoryService } from 'src/app/Services/category.service';
import { ItemService } from 'src/app/Services/item.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  form: any;
  image: string = "";
  formGroup!: FormGroup;
  errors: string[] = [];
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categoryService.GetAll().subscribe(result => result.forEach(value => this.categories.push(value)));

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      length: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      image: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required])
    });
  }

  get Controls(){
    return this.form.controls;
  }

  // SelectImage(image: any) {
  //   debugger
  //   this.form.get('image').setValue(image.target.files[0]);
  //   const reader = new FileReader();
  //   reader.onload = ((value: any) => {
  //     document.getElementById("image")?.removeAttribute("hidden");
  //     document.getElementById("image")?.setAttribute("src", value.target?.result)
  //   });
  //   reader.readAsDataURL(this.image);
  // }

  SelectImage(image: any) {
    const reader = new FileReader();
    reader.onload = ((value: any) => {
      document.getElementById("image")?.removeAttribute("hidden");
      document.getElementById("image")?.setAttribute("src", value.target?.result)
      console.log(value.target?.result);
      this.image = value.target?.result;
    });
    reader.readAsDataURL(image.target.files[0] as File);
  }

  SubmitForm(){
    debugger
    const form = this.form.value;
    var formData = new FormData();

    formData.append("file", this.form.get("image").value);
    // const product = new Product();
    // product.name = form.name;
    // product.description = form.description;
    // product.length = form.length;
    // product.value = form.value;
    // product.image = this.image;

    const data = new Item();
    data.quantity = form.quantity;
    data.categoryId = form.category.id;
    data.product = form;

      this.itemService.AddProduct(data).subscribe(result => console.log(result))

    // this.productService.SaveImage(formData).subscribe(result => {
    //   // const data = new Product();
    //   // data.name = form.name;
    //   // data.category = form.categoryId;
    //   // data.value = form.value;
    //   // data.image = this.image;

    //   // this.productService.AddProduct(data).subscribe(result => console.log(result))
    // });
  }
}