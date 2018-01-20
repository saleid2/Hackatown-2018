package com.hacktown.bertha.bertha;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import com.hacktown.bertha.myapplication.R;

public class Home extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        final Button getHelpBtn = findViewById(R.id.gethelp);

        final Button volunteerBtn = findViewById(R.id.volunteer);

        getHelpBtn.setOnClickListener(new View.OnClickListener(){
           public void onClick(View v){
               Intent openHelpChat = new Intent(Home.this, Chat.class);
               startActivity(openHelpChat);
           }
        });

        volunteerBtn.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                Intent openVolunteerMenu = new Intent(Home.this, VolunteerSelection.class);
                startActivity(openVolunteerMenu);
            }
        });
    }
}
