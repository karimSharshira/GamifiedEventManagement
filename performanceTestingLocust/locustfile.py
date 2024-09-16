from locust import HttpUser, task , User

class gamifiedEvents(HttpUser):
    @task
    def Events(self):
        self.client.get("_visiting")


    