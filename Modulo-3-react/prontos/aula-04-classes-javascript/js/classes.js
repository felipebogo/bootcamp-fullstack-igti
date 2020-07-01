/**
 * Classe mãe/pai
 *
 * Só possui o atributo this.name
 * Possui o método speak() implementado
 * de forma genérica
 */
class Animal {
  constructor(_name) {
    this.name = _name;
  }

  speak() {
    console.log(`${this.name} "falando"...`);
  }
}

/**
 * A classe Dog herda de Animal
 * this.name é passado ao pai/mãe
 * Possui um atributo extra (this.type)
 *
 * O método speak(), por ter sido reimplementado aqui,
 * substitui o método da classe pai/mãe (override)
 */
class Dog extends Animal {
  constructor(_name, _type) {
    super(_name);

    this.type = _type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) latindo...`);
  }
}

window.addEventListener('load', () => {
  /**
   * Testes
   */
  const animal = new Animal('Felix');
  animal.speak();

  const dog = new Dog('Jack', 'Poodle');
  dog.speak();
});
