# Hole In The Wall
![HoleInTheWall](https://user-images.githubusercontent.com/74618860/221284439-b63626aa-b854-4b69-8ea4-b3e64b310cb3.png)

This is our source repo for our senior-project "Hole In The Wall"  

Hole in the wall is a mobile social media application centered around sharing user's favorite foods, recommending places to eat, and creating meetups with friends and peers. 

# Contributors
- Michael Cipolla
- Jake Larmer
- Brian Penot
- Matthew Sky
- Casey Staples
- Jonathan White 

# Development Flow
The Main branch will be used to keep the most recent "working" verison of the application.  

Develop will act as the default branch, and where features will be merged into from other branches.  

Once these features are vetted, a pull request can be requested to merge Develop into Main, and at least (2) Contributors need to approve this request before the merge.  

# Useful Git Commands
1. To clone this repo, you can use the following command  
The <ssh_link_to_repo> can be found be clicking the <>code button above the top of the repo and selecting ssh. 
```
git clone <ssh_link_to_repo> 
```
2. To make sure your current branch is up to date, use git pull  
```
git pull 
```
3. To create a new branch locally, use git checkout -b  
You only need the <remote_branch> if you wanted to base the new branch off of a different branch than the default (Develop) 
```
git checkout -b <branch_name> <remote_branch> 

git checkout -b prototype-casey 
```
4. After you've completed work in your branch, use the following to push a commit to remote  
```
git add . 
git commit -m " I did this work on these files."
git push -u origin <branch_name> # If this is your first push of the branch to remote 
git push -u origin prototype-casey
# otherwise
git push 
```
5. If you want to delete a local branch that you no longer need  
```
git branch -d <branch_name> # -d allows errors to stop the deletion 
git branch -D prototype-casey # -D forces the deletion of the branch
```
