import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ChatUser, ChatMessage } from './chat.model';

import { chatData, chatMessagesData } from './data';
import { UtilisateurService } from '../../core/services/utilisateur.service';
import { Utilisateur } from '../../core/models/utilisateur';
import { Message } from '../../core/models/message';
import { MessagesService } from '../../core/services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollEle') scrollEle;
  @ViewChild('scrollRef') scrollRef;

  username = '';

  // bread crumb items
  breadCrumbItems: Array<{}>;

  chatData: ChatUser[];
  chatMessagesData: ChatMessage[];

  formData: FormGroup;

  // Form submit
  chatSubmit: boolean;

  texte: string;
  users: Utilisateur[];
  messages: Message[];
  user:any;
  message= new Message('');

  constructor(public formBuilder: FormBuilder, private utilisateurService: UtilisateurService,
    private messageService: MessagesService) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Chat', active: true }];
    this.user = JSON.parse(localStorage.getItem('userInfo'))
    console.log(this.user);

    this.onListScroll();

    this.getUsers();
  }

  getUsers(){
    this.utilisateurService.getUsers().snapshotChanges().subscribe(data => {

      this.users = data.map(user => {

        return {

          id: user.payload.doc.id,

          ...user.payload.doc.data() as Utilisateur
        }

      })
      console.log(this.users)
      this.users = this.users.filter(data =>{
        return data.id != this.user.uid
      })

      console.log(this.users)

    })
  }

  getMessage(id:string){
    this.messageService.getMessages().snapshotChanges().subscribe(data => {

      this.messages = data.map(message => {

        return {

          id: message.payload.doc.id,

          ...message.payload.doc.data() as Message
        }

      })
      console.log(this.messages)
      this.messages = this.messages.filter(message =>{
        return message.recepteur.id == id || message.emetteur.id == id
      })

      console.log(this.messages)

    })

  }

  ngAfterViewInit() {
    this.scrollEle.SimpleBar.getScrollElement().scrollTop = 100;
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 200;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }



  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  chatUsername(data) {
    this.username = data.nom+' '+data.prenom;
    this.message.recepteur = data || '';
    this.getMessage(data.id);
  }

  /**
   * Save the message in chat
   */
  messageSave() {


    this.message.date = new Date().toString();
    this.message.emetteur = this.user;
    this.message.text = this.texte;
    console.log(this.message)
    let msg = Object.assign({},this.message)
    this.messageService.CreateMessage(msg);

  }

}
