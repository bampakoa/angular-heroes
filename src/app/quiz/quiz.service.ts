import { Injectable } from '@angular/core';

import { Question } from './question.model';

@Injectable()
export class QuizService {
  private questions: Question[] = [
      {
        no: 1,
        description: 'Would you sacrifice your own life to save the one you love the most?',
        positive: ['1009220', '1009718', '1009368', '1009351', '1009610', '1009262', '1009664'],
        negative: ['1010925', '1009268', '1009189', '1009515', '1009282']
      },
      {
        no: 2,
        description: 'There is a big event and you are invited, but you don’t know anyone. Would you go?',
        positive: ['1009368', '1009262', '1009268', '1009189', '1009282'],
        negative: ['1009220', '1010925', '1009718', '1009351', '1009610', '1009515', '1009664']
      },
      {
        no: 3,
        description: 'You are up against a threat you can’t handle. Would you stay and fight?',
        positive: ['1009220', '1010925', '1009718', '1009351', '1009262', '1009515', '1009664'],
        negative: ['1009368', '1009610', '1009268', '1009189', '1009282']
      },
      {
        no: 4,
        description: 'You have a fight with your true love and it’s her fault. Would you apologize anyway?',
        positive: ['1009220', '1009351', '1009610', '1009268', '1009664'],
        negative: ['1010925', '1009718', '1009368', '1009262', '1009189', '1009515', '1009282']
      },
      {
        no: 5,
        description: 'You are in captivity and you are being interrogated. Would you try to talk your way out of it?',
        positive: ['1009368', '1009610', '1009268', '1009189', '1009282'],
        negative: ['1009220', '1010925', '1009718', '1009351', '1009262', '1009515', '1009664']
      },
      {
        no: 6,
        description: 'You have been granted “license to kill”. Do you use it to avenge someone you hate?',
        positive: ['1010925', '1009718', '1009262', '1009268', '1009189', '1009515'],
        negative: ['1009220', '1009368', '1009351', '1009610', '1009664', '1009282']
      },
      {
        no: 7,
        description: 'You are given the opportunity to be extremely wealthy. But be forever alone. Would you accept it?',
        positive: ['1010925', '1009368', '1009268', '1009515', '1009282'],
        negative: ['1009220', '1009718', '1009351', '1009610', '1009262', '1009189', '1009664']
      },
      {
        no: 8,
        description: 'You can have super strength but in expense of intelligence. Would you choose super strength anyway?',
        positive: ['1010925', '1009351', '1009268', '1009515'],
        negative: ['1009220', '1009718', '1009368', '1009610', '1009262', '1009189', '1009664', '1009282']
      },
      {
        no: 9,
        description: `You can decide to end violence, but doing so all violent people would die. Would you make that decision anyway?`,
        positive: ['1010925', '1009368', '1009262', '1009268', '1009189', '1009515'],
        negative: ['1009220', '1009718', '1009351', '1009610', '1009664', '1009282']
      },
      {
        no: 10,
        description: 'You are about to make a trip to the unknown. Would you fully prepare yourself before you go?',
        positive: ['1009220', '1009368', '1009610', '1009262', '1009189', '1009515', '1009282'],
        negative: ['1010925', '1009718', '1009351', '1009268', '1009664']
      },
      {
        no: 11,
        description: 'If you could be invisible for one day, would you try to make money out of it?',
        positive: ['1009368', '1009268', '1009189', '1009515'],
        negative: ['1009220', '1010925', '1009718', '1009351', '1009610', '1009262', '1009664', '1009282']
      },
      {
        no: 12,
        description: `You can teleport yourself anywhere you want but everytime you do it you lose one year of your life. Would you do it?`,
        positive: ['1010925', '1009351', '1009268', '1009515', '1009282'],
        negative: ['1009220', '1009718', '1009368', '1009610', '1009262', '1009189', '1009664']
      }
  ];

  constructor() { }

  getHero() {
    const ranking = {};

    this.questions.forEach((question: Question) => {
      this.match((question.answer === 'yes') ? question.positive : question.negative, ranking);
    });

    return Object.keys(ranking).reduce((a, b) => ranking[a] > ranking[b] ? a : b);
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  setAnswer(question: Question, answer: string) {
    this.questions.find((q: Question) => q.no === question.no).answer = answer;
  }

  private match(arr: string[], data: any) {
    arr.forEach((name: string) => {
      if (!data[name]) {
        data[name] = 100 / arr.length;
      } else {
        data[name] += 100 / arr.length;
      }
    });
  }

}
