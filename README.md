JavaScript-PersistentSQL

Initial, in baza de date "test" (ar trebui sa fie creata) ar trebui sa fie construite tabelele "persons" si "students" astfel:
create table students (name varchar(32), id int(11) primary key, grade int(11));
create table persons (name varchar(32), id int(11) primary key, job varchar(32));
.

Parola mea in cod pentru autentificare la baza de date este "1234", trebuie schimbata cu parola celui ce ruleaza codul.

tema.js -> implementarea cu clase
proto.js -> implementarea cu functii si prototypes

Fiecare fisier are 3 functii asincrone: init(), main(), change() ce reprezinta niste teste concepute de mine pentru a testa persistenta si functionalitatea. Bazele de date sunt populate cu decomentarea lui init(), ar trebui apelat doar odata. Main() preia din baza de date diferite entitati si le afiseaza. Change() modifica anumite entitati.

Recomand rularea codului in ordinea urmatoare:
init() -> main() -> change() -> main().


