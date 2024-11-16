import requests
from bs4 import BeautifulSoup


def getPageContent(url):
    headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
    r = requests.get(url=url, headers=headers)
    return BeautifulSoup(r.content, 'html5lib')

def getRecipes(url, recipes):

    #MAIN_URL = "https://www.budgetbytes.com/category/recipes/"
    #MAIN_URL = "https://www.budgetbytes.com/category/recipes/page/2/"

    soup = getPageContent(url)

    table = soup.find('div', attrs = {'class':'archive-post-listing'})


    for row in table.findAll('article', attrs = {'class':'post-summary post-summary--secondary'}):
        recipe = {}
        recipe["title"] = row.find('div', attrs = {'class':'post-summary__content'}).h3.text
        recipe["url"] = row.a['href']
        recipe["img"] = row.find('div', attrs = {'class':'post-summary__image'}).img['src']
            
        SECONDARY_URL = recipe["url"]
            
        soup = getPageContent(SECONDARY_URL)

        ingredient_table = soup.find('ul', attrs = {'class':'wprm-recipe-ingredients'})

        recipe["ingredients"] = []
            
        for ingredient in ingredient_table.findAll('li', attrs = {'class':'wprm-recipe-ingredient'}):

            span = ingredient.find('span', attrs = {'class':'wprm-recipe-ingredient-name'})
            ingredient_name = span.text
            recipe["ingredients"].append(ingredient_name)

        recipes.append(recipe)
        print("success")
            
    #print("success")
            

if __name__ == "__main__":

    recipes=[]
    
    MAIN_URL = "https://www.budgetbytes.com/category/recipes/page/8/"

    #urls = [MAIN_URL]

    #for i in range(2, 136):
    #    urls.append(MAIN_URL+"page/"+str(i)+"/")

    getRecipes(MAIN_URL, recipes)

    print(recipes)

    

#filename = 'recipes.csv'


#print(r.content)



#print(soup.prettify())



