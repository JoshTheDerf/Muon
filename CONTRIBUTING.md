### Muon Contributing Guidelines
Here are a few guidelines which will hopefully be helpful to you if you wish to contribute
to this project.

#### Issue Guidelines
Be courteous. Don't fight. Treat everyone else like they're a real person standing in front of you (who may be seven feet tall and incredibly tough). That's about it.

#### How to contribute Code

##### Step 1: Fork the repository.
Fork Muon [on GitHub](https://github.com/Tribex/Muon/) and begin editing it locally.

```
$ git clone git@github.com:USERNAME/Muon.git
$ cd Muon
$ git remote add upstream git://github.com/Tribex/Muon.git
```

##### Step 2: Create a new branch for your feature or bug fix.
Before making any changes, you should switch to a branch specifically for your edits.
It makes it easier to track commits and avoid merge conflicts.

Try and name the branch something descriptive. :)

```
$ git checkout -b my-awesome-feature -t origin/master
```

##### Step 3: Create, commit, and push your changes.
Edit the source files in whatever editor you'd like. See the style guidelines
for information on the preferred style conventions.

Run `gulp transpile` to build the production version.
You can use `gulp default` to recompile your changes on save.

Please try and lint your code with [eslint](http://eslint.org/). There's a configuration file for the style used in this repository provided in the root of the repo.
Many editors have plugins and support for linting automatically, if that would help.

When you are finished, add and commit your changes with

```
$ git add .
$ git commit -m "YOUR DESCRIPTIVE COMMIT MESSAGE"
```

##### Step 4: Open a new Pull Request.
Push your changes to your remote repository with

```
$ git push origin my-awesome-feature
```

Now if you navigate to https://github.com/YOURUSERNAME/Muon, you'll see a green pull request button. Click that to open a pull request. From there we can review your changes and merge them into the master branch when ready.

That ought to be it! Have fun!

#### Style Guidelines
All sources are written using ES2015/6, transpiled through [babel](https://babeljs.io).

Use [eslint](http://eslint.org/) to confirm that your changes follow the style guidelines.

* *Indentation:* 2-space.

* *End-of-statement semicolons:* None. If you're in a situation that would require them, try to rewrite that section in a way which is more readable.

* *Block bracket style:* Opening brackets on the same line as the statement.

* *Trailing commas:* Commas go at the end of the line. Always add a trailing comma. More of a personal preference.

* *Variable case:* camelCase.

* Use `let` or `const` instead of `var`, in true ES6 style.

* Additional features, if possible, should have tests in `test/test.html`. Just create a quick case that will test the feature you've implemented in several ways and state the expected results so that anyone can verify that it's working properly.

* And last but not least, please document any additional methods, public or otherwise, with the JSDoc format.
